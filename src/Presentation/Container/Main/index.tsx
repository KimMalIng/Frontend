import { useState, ChangeEventHandler, useEffect } from 'react';
import { Todo, getToday, showToday, Header, Calender } from '@/Presentation/Component';
//import { getAPIData } from '@/Data/DataSource';
import { CalenderModel } from '@/Presentation/Model';
import { CalenderEntity } from '@/Domain/Entity';
import todoData from '../../../tempData.json';
import style from '@/Presentation/Style/Main.module.css';

const Main = () => {
  const upperBarDate = showToday();
  // isTodoCheck === false, make progress bar
  const [today, setToday] = useState('');
  const [calender, setCalender] = useState<CalenderEntity[]>([]);
  const cModel = new CalenderModel();
  useState(() => {
    setToday('231202');
  }); // 이걸로 바꾸기 setToday(getToday());

  const todos = todoData.filter((todo) => todo.day == today);
  console.log(todos);

  const postBody = {
    user_id: 1,
    startDate: today,
    endDate: today,
  };
  // const todayTodo = getAPIData("POST", "timetable/period", JSON.stringify(postBody));

  const getWeek = async () => {
    const res = await cModel.getCalender();
    setCalender(res);
  }

  useEffect(() => {
    getWeek();
  }, []);

  return (
    <div className={style.Main}>
      {/* <div className={style.todayDate}>
        <p>{upperBarDate}</p>
      </div> */}
      <Header />
      <div className={style.ContentBox}>
        {todos.map((todoSubject, index) =>
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
        )}
      </div>
      <div className={style.CalenderBox}>
        <Calender 
          data={calender}
        />
      </div>
    </div>
  );
};
export default Main;
