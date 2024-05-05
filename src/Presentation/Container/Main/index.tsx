import {
  useState,
  ChangeEventHandler,
  useEffect,
  MouseEventHandler,
} from "react";
import {
  Todo,
  getToday,
  showToday,
  Header,
  Calender,
  Button,
} from "@/Presentation/Component";
import { useRouter } from "next/router";
import MontlyCalendar from './customCalendar';
import { SubjectType } from "@/Data/Model";
import NewTask from "./newTask";
import WeeklyView from "./weeklyView.jsx";
import style from "@/Presentation/Style/Main.module.css";
import "react-calendar/dist/Calendar.css";


const Main = () => {
  // const upperBarDate = showToday();
  // isTodoCheck === false, make progress bar
  const [date, setDate] = useState<Date>(new Date());
  // const router = useRouter();
  const [toggleOn, setModalOn] = useState(false);
  const [deadLine, setDeadLine] = useState("");
  const [dailyTodo, setDailyTodo] = useState([]);

  const handleDeadLine = (val: any) => {
    console.log(val);
    setDeadLine(val); // 시작, 종료 날짜 세팅 완료
    if (deadLine[0] != null) {
      setModalOn(true);
    }
  };

  const closeModal = () => {
    setModalOn(false);
  };

  const clearDeadLine = () => {
    setDeadLine("");
  }


  useEffect(() => {
  }, [dailyTodo]);

  return (
    <div className={style.Main}>
      <Header />
      <div className={style.MonthandDay}>
        <div className={style.ContentBox}>
          <div className={style.TodoDate}>
            <p>Today : {`${date.getFullYear()}.${date.getMonth() + 1
              }.${date.getDate()}`}</p>
          </div>
          {toggleOn ? (
            <NewTask closeModal={closeModal} clearDeadLine={clearDeadLine} /> // 여기서 데드라인 보내줘야함
          ) : (<></>)}

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
        )} */

          }
          {
            dailyTodo.length > 0 && <ul>
              {dailyTodo.map((schedule: any, index) => (
                <li className={style.DailyList} key={index}>{schedule.name}</li>
              ))}
            </ul>
          }
        </div>
        <div className={style.CalenderBox}>
            <>
              <MontlyCalendar />
            </>
        </div>
      </div>
      <WeeklyView />
    </div>
  );
};
export default Main;
