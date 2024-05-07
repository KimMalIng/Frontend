import {
  useState,
  ChangeEventHandler,
  useEffect,
  MouseEventHandler,
} from "react";
import {
  Header,
} from "@/Presentation/Component";
import { GetCalenderUseCase } from '@/Domain/UseCase';
import { CalenderRepositoryImpl, CredentialRepositoryImpl } from "@/Data/Repository";
import { CalenderEntity } from "@/Domain/Entity";
import { DateListType, DateType } from '@/Presentation/Type';
import MontlyCalendar from './customCalendar';

import style from "@/Presentation/Style/Main.module.css";
import "react-calendar/dist/Calendar.css";


const Main = () => {
  const getCalenderUseCase = new GetCalenderUseCase(new CalenderRepositoryImpl(), new CredentialRepositoryImpl());
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [dateList, setDateList] = useState<DateListType>({
    [`${startDate.getFullYear()}.${(startDate.getMonth() + 1 < 10)? `0${(startDate.getMonth() + 1)}`: `${(startDate.getMonth() + 1)}`}.${(startDate.getDate() < 10)? `0${startDate.getDate()}` : `${startDate.getDate()}`}`]: []
  });
  const [dateSaveList, setDateSaveList] = useState<DateType[]>([]);
  const [isSortFinish, setIsSortFinish] = useState(false);
  const [isDateListLoading, setIsDateListLoading] = useState(true);
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [saveIndex, setSaveIndex] = useState(0);

  const sortCalenderList = async (d: Date, calender: CalenderEntity | null | undefined): Promise<void> => {
    setDateSaveList([]);
    if(calender === null || typeof calender === "undefined") return Promise.reject(404);
    const end = (endDate === null) ? startDate : endDate;
    if(d <= end){
      const dayMonthKey = (d.getMonth() + 1 < 10)? `0${(d.getMonth() + 1)}`: `${(d.getMonth() + 1)}`;
      const dayDatekey = (d.getDate() < 10)? `0${d.getDate()}` : `${d.getDate()}`;
      const dateKey = `${d.getFullYear()}.${dayMonthKey}.${dayDatekey}`;
      setDateList({
        ...dateList,
        [dateKey]: []
      });
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
            setDateSaveList(dateSaveList.concat([saveDate]));
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
            setDateSaveList(dateSaveList.concat([saveDate]));
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
            setDateSaveList(dateSaveList.concat([saveDate]));
          }
        })
      );
      
      const dList: DateType[] = dateSaveList;
      if(typeof dList === "undefined") return;
      const sortDList = dList.sort((a, b) => {
        const aTime = (Number(a.startTime.split(":")[0]) * 60) + (Number(a.startTime.split(":")[1]));
        const bTime = (Number(b.startTime.split(":")[0]) * 60) + (Number(b.startTime.split(":")[1]));
        return aTime - bTime;
      })
      dateList[dateKey] = sortDList;
      setDateList({
        ...dateList
      })
      const nextDate = new Date(d);
      sortCalenderList(new Date(nextDate.setDate(nextDate.getDate() + 1)), calender);
    }
    else {
      setIsSortFinish(true);
    }
  }
  const getList = async () => {
    const e = (endDate === null)? (startDate) : (endDate);
    try {
      const data = await getCalenderUseCase.execute(startDate, e);
      setDateList({
        [`${startDate.getFullYear()}.${(startDate.getMonth() + 1 < 10)? `0${(startDate.getMonth() + 1)}`: `${(startDate.getMonth() + 1)}`}.${(startDate.getDate() < 10)? `0${startDate.getDate()}` : `${startDate.getDate()}`}`]: []
      })
      console.log(startDate);
      sortCalenderList(startDate, data);
    } catch (error) {
      console.log(error);
    }
  }
 
  useEffect(() => {
    setIsDateListLoading(true);
    getList();
  }, [startDate, endDate]);

  useEffect(() => {
    console.log(startDate);
    if(isSortFinish) return;
  }, [isSortFinish]);
  return (
    <div className={style.Main}>
      <Header />
      <div className={style.MonthandDay}>
        <div className={style.ContentBox}>
          <h2>일정 목록</h2>


        </div>
        <div className={style.CalenderBox}>
            <MontlyCalendar
              startDate={startDate}
              endDate={endDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
            />
        </div>
      </div>
    </div>
  );
};
export default Main;
