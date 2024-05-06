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
