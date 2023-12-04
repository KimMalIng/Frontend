import { useState, ChangeEventHandler, useEffect } from 'react';
import { Todo, getToday, showToday } from "@/Presentation/Component";
//import { getAPIData } from '@/Data/DataSource';
import todoData from '../../../tempData.json';
import style from "@/Presentation/Style/Main.module.css";

const Main = () => {
    const upperBarDate = showToday();
    // isTodoCheck === false, make progress bar
    const [today, setToday] = useState("");
    useState(() => { setToday("231202"); }) // 이걸로 바꾸기 setToday(getToday());

    const todos = todoData.filter((todo) => todo.day == today);
    console.log(todos);

    const postBody = {
        "user_id": 1,
        "startDate": today,
        "endDate": today
    }

    // const todayTodo = getAPIData("POST", "timetable/period", JSON.stringify(postBody));

    return (
        <div className={style.Main}>
            <div className={style.ContentBox}>
                <div>
                    <p>{upperBarDate}</p>
                </div>
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
                                    todoType={todo.todo_type}
                                    prevValue={todo.progress ? todo.progress : undefined}
                                    checked={todo.isDone ? todo.isDone : undefined}
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