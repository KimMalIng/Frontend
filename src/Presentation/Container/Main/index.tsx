import { useState, ChangeEventHandler, useEffect } from 'react';
import { Todo } from "@/Presentation/Component";
import { getToday } from "@/Presentation/Component";
import { getAPIData } from '@/Data/DataSource';
import todoData  from '../../../tempData.json';
import style from "@/Presentation/Style/Main.module.css";

const Main = () => {
    // isTodoCheck === false, make progress bar
    const [sliderValue, setSliderValue] = useState(0);
    const [today, setToday ] = useState("");
    useState(()=>{
        setToday(getToday());
    })
    const handleSliderChange: ChangeEventHandler<HTMLInputElement> = (e) => { const newValue = parseInt(e.target.value, 10); setSliderValue(newValue); };
    // isTodoCheck ===true, make toggle button 
    const [isDone, setIsDone] = useState(true);
    const handleDone: ChangeEventHandler<HTMLInputElement> = () => { setIsDone((prev) => !prev); }

    const postBody = {
        "user_id" : 1,
        "startDate" : today,
        "endDate" : today
    }
    const todayTodo = getAPIData("POST", "timetable/period", JSON.stringify(postBody));
    todayTodo
    return (
        <div className={style.Main}>
            <div className={style.ContentBox}>
                <div className={style.DayTodoBox}>
                </div>
                <div className={style.DayTimeLine}>
                    <Todo
                        todoName="실험 준비"
                        isTodoCheck={false}
                        value={sliderValue}
                        onChange={handleSliderChange}
                        checked={undefined}
                    />
                    <Todo
                        todoName="교수님 점심식사"
                        isTodoCheck={true}
                        value={sliderValue}
                        onChange={handleDone}
                        checked={isDone}
                    />
                </div>
            </div>
        </div>
    );
};
export default Main;