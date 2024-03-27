import React, { useEffect, useState } from 'react';
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import style from "@/Presentation/Style/customCalendar.module.css";
import moment from 'moment';


function MonthlyCalendar() {
    const [selected, setSelected] = useState('');
    const [dateRange, setDateRange] = useState([new Date(), new Date()]);

    const handleDateRange = (value) => {
        setDateRange(value);
    }

    const [mark, setMark] = useState(["2024-03-12", "2024-03-25", "2024-03-26"]);

    return (
        <div>
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
                // tileContent={({ view }) => view === 'month' &&
                //     <div className={style.DayTile}></div>
                // }
                tileContent={({ date }) => { // 날짜 타일에 컨텐츠 추가하기 (html 태그)
                    // 추가할 html 태그를 변수 초기화
                    let html = [];
                    // 현재 날짜가 post 작성한 날짜 배열(mark)에 있다면, dot div 추가
                    if (mark.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
                      html.push(
                      <div className={style.dot}></div>);
                    }
                    // 다른 조건을 주어서 html.push 에 추가적인 html 태그를 적용할 수 있음.
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
        </div>
    );
};
export default MonthlyCalendar;