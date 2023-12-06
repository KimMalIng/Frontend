import { useState, ChangeEventHandler, useEffect } from 'react';
import { Todo, getToday, showToday, Header, Calender } from '@/Presentation/Component';
import { CalenderModel } from '@/Presentation/Model';
import { CalenderEntity } from '@/Domain/Entity';
import todoData from '../../../tempData.json';
import style from '@/Presentation/Style/Main.module.css';

const Main = () => {
  const upperBarDate = showToday();
  // isTodoCheck === false, make progress bar
  const [calender, setCalender] = useState<CalenderEntity[]>([]);
  const [timeline, setTimeline] = useState<CalenderEntity>();
  const [isCalenderLoading, setIsCalenderLoading] = useState(false);
  const [isTimelineLoading, setIsTimelineLoading] = useState(false);
  const cModel = new CalenderModel();

  const getWeek = async () => {
    const res = await cModel.getCalender();
    setCalender(res);
    setIsCalenderLoading(true);
    await Promise.all(
      res.map((d) => {
        const date = new Date(`${d.day.split(".")[0]}-${d.day.split(".")[1]}-${d.day.split(".")[2]}`)
        if(
          new Date().getFullYear() === date.getFullYear() &&
          new Date().getMonth() === date.getMonth() &&
          new Date().getDate() === date.getDate()
        ) setTimeline(d);
      })
    );
    setIsTimelineLoading(true);
  }

  useEffect(() => {
    getWeek();
  }, []);

  return (
    <div className={style.Main}>
      <Header />
      <div className={style.ContentBox}>
        <div className={style.TodoDate}>
          <p>{upperBarDate}</p>
        </div>
        {
          (typeof timeline === "undefined") ? (
            <></>
          ) : (
            (isTimelineLoading) ? (
              timeline.subject.map((todo, i)=>{
                return(
                  <Todo
                    key={i} // Adjust the key to ensure uniqueness
                    label={todo.label}
                    name={todo.name}
                    startTime={todo.startTime}
                    endTime={todo.endTime}
                    todoType={(todo.label === 0)? 'fixed' : 'check'}
                    prevValue={undefined}
                    checked={undefined}
                  ></Todo>
                );
              })
            ) : (
              <></>
            )
          )
        }
        {/* {todos.map((todoSubject, index) =>
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
        )} */}
      </div>
      <div className={style.CalenderBox}>
        {isCalenderLoading? (
          <Calender 
           data={calender}
         />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
export default Main;
