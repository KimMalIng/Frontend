import {
  useState,
  useRef,
  useEffect,
  MouseEventHandler,
  ReactNode,
} from "react";
import {
  Header, Dialog
} from "@/Presentation/Component";
import { GetCalenderUseCase } from '@/Domain/UseCase';
import { CalenderRepositoryImpl, CredentialRepositoryImpl } from "@/Data/Repository";
import { CalenderEntity } from "@/Domain/Entity";
import { DateListType, DateType } from '@/Presentation/Type';
import MontlyCalendar from './customCalendar';
import Skeleton from 'react-loading-skeleton'
import * as ContextMenu from '@radix-ui/react-context-menu';
import * as Progress from '@radix-ui/react-progress';
import cn from 'classnames';
import { PlusIcon, MinusIcon } from '@radix-ui/react-icons';

import style from "@/Presentation/Style/Main.module.css";
import "react-calendar/dist/Calendar.css";
import 'react-loading-skeleton/dist/skeleton.css';
import '@fontsource/inter';
import ct from '@/Presentation/Style/ContextMenu.module.css';
import pg from '@/Presentation/Style/Progress.module.css';

const Main = () => {
  const getCalenderUseCase = new GetCalenderUseCase(new CalenderRepositoryImpl(), new CredentialRepositoryImpl());
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [dateList, setDateList] = useState<DateListType>({});
  const [progressPercentage, setProgressPercentage] = useState(100);
  const [isSortFinish, setIsSortFinish] = useState(false);
  const [isDateListLoading, setIsDateListLoading] = useState(true);
  const [isEndDialogOpen, setIsEndDialogOpen] = useState(false);
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [saveIndex, setSaveIndex] = useState(0);

  const handleFinishSchedule: MouseEventHandler<HTMLDivElement> = (e) => {
    setIsEndDialogOpen(true);
  }

  const handleFinishScheduleClose: MouseEventHandler<HTMLDivElement> = (e) => {
    setIsEndDialogOpen(false);
  }


  const sortCalenderList = async (d: Date, calender: CalenderEntity | null | undefined): Promise<void> => {
    const dateSaveList: DateType[] = [];
    if(calender === null || typeof calender === "undefined") return Promise.reject(404);
    const end = (endDate === null) ? startDate : endDate;
    if(d <= end){
     
      const dayMonthKey = (d.getMonth() + 1 < 10)? `0${(d.getMonth() + 1)}`: `${(d.getMonth() + 1)}`;
      const dayDatekey = (d.getDate() < 10)? `0${d.getDate()}` : `${d.getDate()}`;
      const dateKey = `${d.getFullYear()}.${dayMonthKey}.${dayDatekey}`;
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
      console.log(dateSaveList);
      setDateList({
        ...dateList,
        [dateKey]: sortDateList
      })
      // dateSaveList.current.splice(0, dateSaveList.current.length);
      const nextDate = new Date(d);
      await sortCalenderList(new Date(nextDate.setDate(nextDate.getDate() + 1)), calender);
    }
    else {
      setIsSortFinish(true);
      setTimeout(() => {
        setIsDateListLoading(false);
      }, 1000)
    }
  }
  const getList = async () => {
    const e = (endDate === null)? (startDate) : (endDate);
    try {
      const data = await getCalenderUseCase.execute(startDate, e);
      console.log(data);
      setDateList({});
      sortCalenderList(startDate, data);
    } catch (error) {
      console.log(error);
    }
  }
  const setLabel = (l: number): string => {
    if(l === 1) return style.label1;
    if(l === 2) return style.label2;
    return style.label3;
  }
  const printCalender = (d: Date): ReactNode => {
    if(isDateListLoading) return <></>
    const end = (endDate === null) ? startDate : endDate;
    if(d <= end){
      const dayMonthKey = (d.getMonth() + 1 < 10)? `0${(d.getMonth() + 1)}`: `${(d.getMonth() + 1)}`;
      const dayDatekey = (d.getDate() < 10)? `0${d.getDate()}` : `${d.getDate()}`;
      const dateKey = `${d.getFullYear()}.${dayMonthKey}.${dayDatekey}`;

      const nextDate = new Date(d);
      const returnComponent = printCalender(new Date(nextDate.setDate(nextDate.getDate() + 1)));
      console.log(dateList);
      if(typeof dateList[dateKey] === "undefined"){
        return (
          <>
            <h2 className={style.WeeklyListTitle}>{dateKey}</h2>
            {returnComponent}
          </>
        );
      }
      return (
        <>
          <div className={style.WeeklyListBox}>
            <h2 className={style.WeeklyListTitle}>{dateKey}</h2>
          </div>
          <div className={style.WeeklyListItemBox}>
          {
            dateList[dateKey].map((d) => {
              return (
                <div 
                  className={cn(
                    style.WeeklyListItem,
                  )}
                >
                  <p className={style.WeeklyStartTime}>{d.startTime}</p>
                  <ContextMenu.Root>
                    <ContextMenu.Trigger
                      className={ct.ContextMenuTrigger}
                    >
                      <div className={cn(style.WeeklyItem, setLabel(d.label))}>
                        <h2 className={style.WeeklyItemTitle}>{d.name}</h2>
                      </div>
                    </ContextMenu.Trigger>
                    <ContextMenu.Portal>
                  <ContextMenu.Content
                    className={ct.ContextMenuContent}
                  >
                    <ContextMenu.Item
                      className={ct.ContextMenuItem}
                      onClick={handleFinishSchedule}
                    >
                      일정 완료하기
                      <div className={ct.RightSlot}>
                        <PlusIcon />
                      </div>
                    </ContextMenu.Item>
                    <ContextMenu.Item
                      className={ct.ContextMenuItem}
                    >
                      일정 삭제하기
                      <div className={ct.RightSlot}>
                        <MinusIcon />
                      </div>
                    </ContextMenu.Item>
                  </ContextMenu.Content>
                </ContextMenu.Portal>
                  </ContextMenu.Root>
                </div>
              );
            })
          }
          </div>
          {returnComponent}
        </>
      );
    }
    else{
      return <></>;
    }
  }
 
  useEffect(() => {
    setIsDateListLoading(true);
    getList();
  }, [startDate, endDate]);

  useEffect(() => {
    if(isSortFinish) return;
  }, [isSortFinish]);
  return (
    <div className={style.Main}>
      <Header />
      <div className={style.MonthandDay}>
        <div className={style.ContentBox}>
          <h2 className={style.ContentTitle}>일정 목록</h2>
          {(isEndDialogOpen)? ( 
            <Dialog
              dialogChildren={
                <>
                  <h2>일정 완료하기</h2>
                  <Progress.Root
                    className={pg.ProgressRoot}
                  >
                      <Progress.Indicator
                        className={pg.ProgressIndicator}
                        style={{ transform: `translateX(-${100 - progressPercentage}%)` }}
                      />
                  </Progress.Root>
                </>
              }
            />
          )  : (
            <></>
          )}
          {(isDateListLoading)? (
                 <>
                  <Skeleton 
                    className={style.SkeletonTitle} 
                    height={30}
                  />
                  <div className={style.SkeletonBox}>
                    <Skeleton height={44}/>
                    <Skeleton height={22}/>
                    <Skeleton height={44}/>
                    <Skeleton height={22}/>
                    <Skeleton height={44}/>
                    <Skeleton height={22}/>
                    <Skeleton height={44}/>
                    <Skeleton height={22}/>
                    <Skeleton height={44}/>
                    <Skeleton height={22}/>
                    <Skeleton height={44}/>
                    <Skeleton height={22}/>
                    <Skeleton height={44}/>
                  </div>
                </>
          ) : (
            printCalender(startDate)
          )}
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
