import { useState, ChangeEventHandler, useEffect, MouseEventHandler } from 'react';
import {
  Todo,
  getToday,
  showToday,
  Header,
  Calender,
  Button
} from '@/Presentation/Component';
import { useRouter } from 'next/router';
import { CalenderModel } from '@/Presentation/Model';
import { SubjectType } from '@/Data/Model';
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
  const [date, setDate] = useState<Date>(new Date());
  const cModel = new CalenderModel();
  const router = useRouter();

  const onAddButtonClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    router.push("/newtask")
  }

  const updateNowDate = (n: number): void => {
    const changeDate = (date.getDay() === 0)? 7 : date.getDay();
    setDate(new Date(
      date.setDate(
        date.getDate() + (n - changeDate)
      )
    ));
  }

  const getWeek = async () => {
    const res = await cModel.getCalender();
    setCalender(res);
    setIsCalenderLoading(true);
    await Promise.all(
      res.map((d) => {
        const calenderDate = new Date(
          `${d.day.split('.')[0]}-${d.day.split('.')[1]}-${d.day.split('.')[2]}`
        );
        if (
          date.getFullYear() === calenderDate.getFullYear() &&
          date.getMonth() === calenderDate.getMonth() &&
          date.getDate() === calenderDate.getDate()
        )
          setTimeline(d);
      })
    );
    setIsTimelineLoading(true);
  };

  const updateTimeLineData = () => {
    setTimeline(undefined);
    calender.map((d) => {
      const calenderDate = new Date(
        `${d.day.split('.')[0]}-${d.day.split('.')[1]}-${d.day.split('.')[2]}`
      );
      if (
        date.getFullYear() === calenderDate.getFullYear() &&
        date.getMonth() === calenderDate.getMonth() &&
        date.getDate() === calenderDate.getDate()
      )
      setTimeline(d);
    })
  }

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
          <p>{`${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`}</p>

          <Button
            width="100px"
            height="26px"
            fontSize="10px"
            backgroundColor="#49A078"
            color="#FFF"
            imgsrc="#"
            onClick={onAddButtonClick}
          >
            일정 추가하기
          </Button>
        </div>
        {typeof timeline === 'undefined' ? (
          <></>
        ) : isTimelineLoading ? (
          timeline.subject.map((todo, i) => {
            return (
              <Todo
                key={i} // Adjust the key to ensure uniqueness
                label={todo.label}
                name={todo.name}
                startTime={todo.startTime}
                endTime={todo.endTime}
                todoType={todo.label === 0 ? 'fixed' : 'check'}
                prevValue={undefined}
                checked={undefined}
              ></Todo>
            );
          })
        ) : (
          <></>
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
        {isCalenderLoading ? <Calender data={calender} updateNowDate={updateNowDate} /> : <></>}
      </div>
    </div>
  );
};
export default Main;
