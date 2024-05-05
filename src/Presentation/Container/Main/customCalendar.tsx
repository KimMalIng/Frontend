import React, { useEffect, useState, MouseEventHandler, MouseEvent } from 'react';
import { Calendar } from 'react-calendar';
import { Value } from 'react-calendar/dist/cjs/shared/types';
import { Dialog } from '@/Presentation/Component';
import NewTask from './newTask';
import * as ContextMenu from '@radix-ui/react-context-menu';

import ct from '@/Presentation/Style/ContextMenu.module.css';
import 'react-calendar/dist/Calendar.css';
import style from "@/Presentation/Style/customCalendar.module.css";
import { PlusIcon, MinusIcon } from '@radix-ui/react-icons';


const MonthlyCalendar = ({}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [calenderValue, setCalenderValue] = useState<Value>(new Date());
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(null);
  
  const handleAddSchedule: MouseEventHandler<HTMLDivElement> = (e) => {
    setIsDialogOpen(true);
    console.log(calenderValue);
  }
  const handleAddScheduleClose: MouseEventHandler<HTMLDivElement> = (e) => {
    setIsDialogOpen(false);
  }
  const handleCalenderValue = (value: Value, e: MouseEvent<HTMLButtonElement>) => {
    if(value === null) return;
    console.log(value);
    if(Array.isArray(value)){
      if(value[0] !== null) setStartDate(value[0]);
      if(value[1] !== null) setEndDate(value[1]);

    }
    else{
      setStartDate(value);
    }
  }

  const filterValue = (): string => {
    if(endDate === null){
      return `
        ${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}
        에 일정 등록하기
      `;
    }
    else if(
      startDate.getFullYear() === endDate.getFullYear() &&
      startDate.getMonth() === endDate.getMonth() &&
      startDate.getDate() === endDate.getDate() 
    ){
      return `
      ${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}
      에 일정 등록하기
    `;
    }
    else {
      return `
      ${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()} ~ 
      ${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()}
      에 일정 등록하기
    `;
    }
  }
  
  useEffect(() => {
  }, []);

  return (
    <>
      {(isDialogOpen)?(
        <Dialog 
          dialogChildren={
            <div>
              <h2
                className={style.DialogTitle}
              >
                {filterValue()}
              </h2>
              <NewTask />
            </div>
          }
          onClose={handleAddScheduleClose}
        />
      ) : (<></>)}
      <Calendar
        locale="en"
        allowPartialRange={true}
        className={style.MonthCalendar}
        next2Label={null}
        prev2Label={null}
        returnValue="range"
        selectRange={true}
        onChange={handleCalenderValue}
        tileContent={({ date }) => {
          return (
              <ContextMenu.Root>
                <ContextMenu.Trigger
                   className={ct.ContextMenuTrigger}
                >
                  <div className={style.NoScheduleDayTile}>
                    
                  </div>
                </ContextMenu.Trigger>
                <ContextMenu.Portal>
                  <ContextMenu.Content
                    className={ct.ContextMenuContent}
                  >
                    <ContextMenu.Item
                      className={ct.ContextMenuItem}
                      onClick={handleAddSchedule}
                    >
                      일정 추가하기
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

          );
        }}
      />
    </>
  );
};
export default MonthlyCalendar;