import React, { useEffect, useState } from 'react';
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import style from "@/Presentation/Style/customCalendar.module.css";
import moment from 'moment';
import dummyJson from "./dummyJson.json";
import * as ContextMenu from '@radix-ui/react-context-menu';
import ct from '@/Presentation/Style/ContextMenu.module.css';


function MonthlyCalendar({setDeadLine, setDailyTodo}) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [scheduleData, setScheduleData] = useState({}); // New state variable
  
  const handleDateRange = (value) => {
    const formattdRange = [
      moment(value[0]).format("YYYYMMDD"),
      moment(value[1]).format("YYYYMMDD")
    ];
    setDeadLine(formattdRange);
  }
  
  useEffect(() => {
    const processedScheduleData = dummyJson.reduce((acc, curr) => {
      const date = moment(curr.date).format("YYYY-MM-DD");
      acc[date] = acc[date] || { date, schedules: [] };
      acc[date].schedules.push({ ...curr.subject[0] });
      return acc;
    }, {}); 

    setScheduleData(processedScheduleData); // Update state with processed data
  }, []);

  const handleDateClick = (date) => {
    const formattedDate = moment(date).format("YYYY-MM-DD"); // Format date
    console.log("Selected Date : ", formattedDate);
    setSelectedDate(formattedDate); // Update selected date state

    // Extract daily todos for the selected date
    const dailyTodos = scheduleData[formattedDate]?.schedules || [];
    console.log(dailyTodos);
    setDailyTodo(dailyTodos); // Pass daily todos to parent component
  };

  return (
    <>
      <Calendar
        locale="en"
        allowPartialRange={true}
        className={style.MonthCalendar}
        prev2AriaLabel={null}
        prev2Label={null}
        next2AriaLabel={null}
        next2Label={null}
        returnValue="range"
        selectRange="true"
        tileContent={({ date }) => {
          const schedules = scheduleData[moment(date).format("YYYY-MM-DD")]?.schedules;
          let html = [];
          if (schedules && schedules.length > 0) {
            html.push(
              <div className={style.ScheduleList}>
                {schedules.map((schedule) => (
                  <div key={schedule.name} className={style.ScheduleItem}>
                    {schedule.name}
                  </div>
                ))}
              </div>
            );
          }
          return (
              <ContextMenu.Root>
                <ContextMenu.Trigger
                   className={ct.ContextMenuTrigger}
                >
                  <div className={style.NoScheduleDayTile}>
                    {html}
                  </div>
                </ContextMenu.Trigger>
                <ContextMenu.Portal>
                  <ContextMenu.Content
                    className={ct.ContextMenuContent}
                    sideoffset={5}
                    align="end"
                  >
                    <ContextMenu.Item
                      className={ct.ContextMenuItem}
                    >
                      일정 추가하기
                    </ContextMenu.Item>
                    <ContextMenu.Item
                      className={ct.ContextMenuItem}
                    >
                      일정 삭제하기
                    </ContextMenu.Item>
                  </ContextMenu.Content>
                </ContextMenu.Portal>
              </ContextMenu.Root>

          );
        }}
        onChange={handleDateRange}
      />
    </>
  );
};
export default MonthlyCalendar;