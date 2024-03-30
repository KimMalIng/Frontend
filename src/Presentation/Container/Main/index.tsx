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
import MontlyCalendar from './customCalendar.jsx';
import { CalenderModel } from "@/Presentation/Model";
import { SubjectType } from "@/Data/Model";
import { CalenderEntity } from "@/Domain/Entity";
import NewTask from "./newTask";
import style from "@/Presentation/Style/Main.module.css";
import "react-calendar/dist/Calendar.css";


const Main = () => {
  // const upperBarDate = showToday();
  // isTodoCheck === false, make progress bar
  const [calender, setCalender] = useState<CalenderEntity[]>([]);
  const [timeline, setTimeline] = useState<CalenderEntity>();
  const [isCalenderLoading, setIsCalenderLoading] = useState(false);
  const [isTimelineLoading, setIsTimelineLoading] = useState(true);
  const [date, setDate] = useState<Date>(new Date());
  const cModel = new CalenderModel();
  // const router = useRouter();
  const [toggleOn, setModalOn] = useState(true);

  const onAddButtonClick: MouseEventHandler<HTMLButtonElement> = () => {
    setModalOn(true);
  };
  const closeModal = () => {
    setModalOn(false);
  };

  const updateNowDate = (n: number): void => {
    const changeDate = date.getDay() === 0 ? 7 : date.getDay();
    setDate(new Date(date.setDate(date.getDate() + (n - changeDate))));
  };

  const getWeek = async () => {
    const res = await cModel.getCalender();
    setCalender(res);
    setIsCalenderLoading(true);
    await Promise.all(
      res.map((d) => {
        const calenderDate = new Date(
          `${d.day.split(".")[0]}-${d.day.split(".")[1]}-${d.day.split(".")[2]
          }`,
        );
        if (
          date.getFullYear() === calenderDate.getFullYear() &&
          date.getMonth() === calenderDate.getMonth() &&
          date.getDate() === calenderDate.getDate()
        )
          setTimeline(d);
      }),
    );
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
    <div className={style.Main}>
      <Header />
      <div className={style.ContentBox}>
        <div className={style.TodoDate}>
          <p>Today : {`${date.getFullYear()}.${date.getMonth() + 1
            }.${date.getDate()}`}</p>
        </div>
        {toggleOn ? (
          <NewTask closeModal={closeModal} />
        ) : typeof timeline === "undefined" ? (
          <div>주간 일정을 로딩 중 입니다 ... </div>
        ) : isTimelineLoading ? (
          timeline.subject.map((todo, i) => {
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
          })
        ) : (
          <>
          </>
        )}

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
        {isCalenderLoading ? (
          <></>
        ) : (
          <>
            <MontlyCalendar />
          </>
        )}
      </div>
    </div>
  );
};
export default Main;
