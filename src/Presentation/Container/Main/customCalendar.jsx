import React, { useEffect, useState } from 'react';
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import style from "@/Presentation/Style/customCalendar.module.css";
import moment from 'moment';
import dummyJson from "./dummyJson.json";


function MonthlyCalendar() {
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [scheduleData, setScheduleData] = useState({}); // New state variable

  const handleDateRange = (value) => {
    console.log(dateRange);
    setDateRange(value);
  }
  useEffect(() => {
    // 스케줄 데이터를 날짜별로 분류하여 객체에 저장
    const processedScheduleData = dummyJson.reduce((acc, curr) => {
      const date = moment(curr.date).format("YYYY-MM-DD");
      acc[date] = acc[date] || { date, schedules: [] };
      acc[date].schedules.push({ ...curr.subject[0] });
      return acc;
    }, {});

    setScheduleData(processedScheduleData); // Update state with processed data
  }, []);

  const showDailyTodo = () => {
    
  }
  
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
              <div className={style.ScheduleList} onClick={showDailyTodo}>
                {schedules.map((schedule) => (
                  <div key={schedule.name} className={style.ScheduleItem}>
                    {schedule.name}
                  </div>
                ))}
              </div>
            );
          }
          return (
            <>
              <div className={style.DayTile}>
                {html}
              </div>
            </>
          );
        }}
        onChange={handleDateRange}
      />
    </>
  );
};
export default MonthlyCalendar;