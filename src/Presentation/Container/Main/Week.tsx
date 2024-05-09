import cn from 'classnames';
import { ReactNode, useEffect, useState } from "react";
import { DateType, DateListType, WeekProps} from '@/Presentation/Type';
import { GetCalenderUseCase } from "@/Domain/UseCase";
import { CalenderRepositoryImpl, CredentialRepositoryImpl } from '@/Data/Repository';
import { CalenderEntity } from "@/Domain/Entity";

import main from '@/Presentation/Style/Main.module.css';

const Week = ({
  startDate,
  endDate
}: WeekProps) => {
  const getCalenderUseCase = new GetCalenderUseCase(new CalenderRepositoryImpl(), new CredentialRepositoryImpl());
  const [dateList, setDateList] = useState<DateListType>({});
  const [printList, setPrintList] = useState<number[]>(new Array(192).fill(0));
  const [isSortFinish, setIsSortFinish] = useState(false);
  const [isDateListLoading, setIsDateListLoading] = useState(true);

  const translateDate = (d: Date): string => {
    const dayMonthKey = (d.getMonth() + 1 < 10)? `0${(d.getMonth() + 1)}`: `${(d.getMonth() + 1)}`;
    const dayDatekey = (d.getDate() < 10)? `0${d.getDate()}` : `${d.getDate()}`;
    const dateKey = `${d.getFullYear()}.${dayMonthKey}.${dayDatekey}`;
    return dateKey;
  }

  const getList = async () => {
    try {
      const data = await getCalenderUseCase.execute(startDate, endDate);
      setDateList({});
      sortCalenderList(startDate, data);
    } catch (error) {
      console.log(error);
    }
  }

  const translateList = async (d: Date) => {
    if(d <= endDate){
      const dateKey = translateDate(d);
      const nowDay = d.getDay();
      if(typeof dateList[dateKey] !== "undefined") {
        await Promise.all(
          dateList[dateKey].map((c)=>{
            const startN = Number(c.startTime.split(":")[0]);
            console.log(startN)
            const endN = Number(c.endTime.split(":")[0]);
            if(isNaN(startN) || isNaN(endN)) return;
            for(let i = startN; i < endN; i++){
              const changeList = printList;
              const changeIndex = (nowDay) + (i) * 8;
              changeList.splice(changeIndex, 1, c.label + 1);
              setPrintList([...changeList])
            }
          })
        );
      }
      const nextDate = new Date(d);
      await translateList(new Date(nextDate.setDate(nextDate.getDate() + 1)));
    }
    else{
      setIsSortFinish(true);
    }
  }

  const sortCalenderList = async (d: Date, calender: CalenderEntity | null | undefined): Promise<void> => {
    const dateSaveList: DateType[] = [];
    if(calender === null || typeof calender === "undefined") return Promise.reject(404);
    if(d <= endDate){
      const dateKey = translateDate(d);
      await Promise.all(
        calender.EveryTimeJob.map((c) => {
          const day = d.getDay();
          if((c.dayOfTheWeek + 1) === day){
            const saveDate: DateType = {
              id: c.id,
              label: c.label,
              name: c.name,
              startTime: c.startTime,
              endTime: c.endTime,
              fixed: true,
              complete: c.complete,
              estimatedTime: c.estimatedTime
            }
         
            dateSaveList.push(saveDate);
          }
        })
      );
      await Promise.all(
        calender.SeperatedJob.map((c) => {
          if(dateKey === c.day){
            const saveDate: DateType = {
              id: c.id,
              label: c.label,
              name: c.name,
              startTime: c.startTime,
              endTime: c.endTime,
              fixed: c.fixed,
              complete: c.complete,
              estimatedTime: c.estimatedTime
            }
            dateSaveList.push(saveDate);
          }
        })
      );
      await Promise.all(
        calender.FixedJob.map((c) => {
          const dateKeyToDate = new Date(`${dateKey.split(".")[0]}-${dateKey.split(".")[1]}-${dateKey.split(".")[2]}`);
          const cStartDateToDate = new Date(`${c.startDate.split(".")[0]}-${c.startDate.split(".")[1]}-${c.startDate.split(".")[2]}`);
          const deadline = (c.deadline === null)? c.startDate : c.deadline;
          const cEndDateToDate = new Date(`${deadline.split(".")[0]}-${deadline.split(".")[1]}-${deadline.split(".")[2]}`);
          if(dateKeyToDate >= cStartDateToDate && dateKeyToDate <= cEndDateToDate){
            const saveDate: DateType = {
              id: c.id,
              label: c.label,
              name: c.name,
              startTime: c.startTime,
              endTime: c.endTime,
              fixed: true,
              complete: c.complete,
              estimatedTime: c.estimatedTime
            }
            dateSaveList.push(saveDate);
          }
        })
      );
        const sortDateList = dateSaveList.sort((a, b) => {
        const aTime = (Number(a.startTime.split(":")[0]) * 60) + (Number(a.startTime.split(":")[1]));
        const bTime = (Number(b.startTime.split(":")[0]) * 60) + (Number(b.startTime.split(":")[1]));
        return aTime - bTime;
      });
      setDateList({
        ...dateList,
        [dateKey]: sortDateList
      })
      const nextDate = new Date(d);
      await sortCalenderList(new Date(nextDate.setDate(nextDate.getDate() + 1)), calender);
    }
    else {
      const s = new Date(startDate);
      translateList(s);
    }
  }
  
  const setLabel = (l: number): string => {
    if(l === 1) return main.label1;
    if(l === 2) return main.label2;
    if(l === 3) return main.label3;
    return main.label4;
  }

  const print = (i: number, l: ReactNode): ReactNode => {
    if(i === 192) return (<>{l}</>);
    const nowList = printList.slice(i, (i+8));
    const nextList: ReactNode = (
      <>
        {l}
        <div className={main.WeekPrintBox}>
          {nowList.map((n, index)=>{
            return(
              <div key={index + i}className={cn(main.WeekContent, setLabel(n))}>
                {((index + i) % 8 === 0)? (
                  <>{`${(index + i) / 8} : 00 ~ ${(index + i) / 8 + 1} : 00`}</>
                ) : (
                  <></>                  
                )}
              </div>
            );
          })}
        </div>
      </>
    )
    return print((i+8), nextList);
  }
  useEffect(() => {
    getList();
  }, [])
  useEffect(() => {
    if(isSortFinish){
      setTimeout(() => {
        setIsDateListLoading(false);
      }, 1000)
    }
  }, [isSortFinish])
  return(
    <>{(isDateListLoading )?(<></>):(print(0, <></>))}</>
  );
};

export default Week;