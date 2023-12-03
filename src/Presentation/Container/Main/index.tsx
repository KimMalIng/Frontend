import { useState, ChangeEventHandler, useEffect } from 'react';
import { Todo } from "@/Presentation/Component";
import { getToday } from "@/Presentation/Component";
//import { getAPIData } from '@/Data/DataSource';
import todoData from '../../../tempData.json';
import style from "@/Presentation/Style/Main.module.css";

const Main = () => {

    // isTodoCheck === false, make progress bar
    const [sliderValue, setSliderValue] = useState(0);
    const [today, setToday] = useState("");
    useState(() => { setToday("231202"); }) // 이걸로 바꾸기 setToday(getToday());

    const todos = todoData.filter((todo) => todo.day == today);
    console.log(todos);
    const handleSliderChange: ChangeEventHandler<HTMLInputElement> = (e) => { const newValue = parseInt(e.target.value, 10); setSliderValue(newValue); };
    // isTodoCheck ===true, make toggle button 
    const [isDone, setIsDone] = useState(true);
    const handleDone: ChangeEventHandler<HTMLInputElement> = () => { setIsDone((prev) => !prev); }

    const postBody = {
        "user_id": 1,
        "startDate": today,
        "endDate": today
    }

    // const todayTodo = getAPIData("POST", "timetable/period", JSON.stringify(postBody));
    
    return (
        <div className={style.Main}>
            <div className={style.ContentBox}>
                <div className={style.DayTodoBox}>
                </div>
                <div className={style.DayTimeLine}>
                    {
                        todos.map((todoSubject, index) => (
                            todoSubject.subject.map((todo, todoIndex) => (
                                <Todo
                                    key={index * 10 + todoIndex} // Adjust the key to ensure uniqueness
                                    label={todo.label}
                                    name={todo.name}
                                    startTime={todo.startTime}
                                    endTime={todo.endTime}
                                    isTodoCheck={false}
                                    value={sliderValue}
                                    onChange={handleSliderChange}
                                    checked={undefined}
                                ></Todo>
                            ))
                        ))
                    }
                </div>
            </div>
        </div>
    );
};
export default Main;