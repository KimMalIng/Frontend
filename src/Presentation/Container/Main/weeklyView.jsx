import { Calender, Todo } from "@/Presentation/Component";
import { CalenderModel } from "@/Presentation/Model";
import { CalenderEntity } from "@/Domain/Entity";
import todoData from '../../../tempData.json';
import style from '@/Presentation/Style/weeklyView.module.css';
import { useState, useEffect } from "react";

function WeeklyView() {

    const [calender, setCalender] = useState([]);
    const [timeline, setTimeline] = useState();
    // 원래 아래처럼 정의된 엔티티에 맞게 가져와야하는데 엔티티도 바꼈고, 지금 빨리 하느라 jsx임
    // const [calender, setCalender] = useState < CalenderEntity[] > ([]);
    // const [timeline, setTimeline] = useState < CalenderEntity > ();
    const [isTimelineLoading, setIsTimelineLoading] = useState(true);
    const [date, setDate] = useState(new Date());
    const cModel = new CalenderModel();
    const subject = todoData;

    const updateNowDate = () => {
        const changeDate = date.getDay() === 0 ? 7 : date.getDay();
        setDate(new Date(date.setDate(date.getDate() + (n - changeDate))));
    };

    const getWeek = async () => {
        // const res = await cModel.getCalender();
        // setCalender(res);
        // setIsCalenderLoading(true);
        // await Promise.all(
        //     res.map((d) => {
        //         const calenderDate = new Date(
        //             `${d.day.split(".")[0]}-${d.day.split(".")[1]}-${d.day.split(".")[2]
        //             }`,
        //         );
        //         if (
        //             date.getFullYear() === calenderDate.getFullYear() &&
        //             date.getMonth() === calenderDate.getMonth() &&
        //             date.getDate() === calenderDate.getDate()
        //         )
        //             setTimeline(d);
        //     }),
        // );
        setIsTimelineLoading(true);
    };

    const updateTimeLineData = () => {
        setTimeline(undefined);
        calender.map((d) => {
            const calenderDate = new Date(
                `${d.day.split(".")[0]}-${d.day.split(".")[1]}-${d.day.split(".")[2]}`,
            );
            if (
                date.getFullYear() === calenderDate.getFullYear() &&
                date.getMonth() === calenderDate.getMonth() &&
                date.getDate() === calenderDate.getDate()
            )
                setTimeline(d);
        });
    };

    useEffect(() => {
        getWeek();
    }, []);

    useEffect(() => {
        updateTimeLineData();
    }, [date]);

    return (
        <div className={style.weeklyMain}>
            {typeof timeline === "undefined" ? (
                <div>주간 일정을 로딩 중 입니다 ... </div>
            ) : isTimelineLoading ? (timeline.subject.map((todo, i) => {
                return (
                    <Todo
                        key={i} // Adjust the key to ensure uniqueness
                        label={todo.label}
                        name={todo.name}
                        startTime={todo.startTime}
                        endTime={todo.endTime}
                        todoType={todo.label === 0 ? "fixed" : "check"}
                        prevValue={undefined}
                        checked={undefined}
                    ></Todo>
                );
            })) : (<></>)}
            <Calender
                data={calender} updateNowDate={updateNowDate}
            />
        </div>
    )
}

export default WeeklyView;