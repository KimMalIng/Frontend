import {
  useState,
  ChangeEventHandler,
  useEffect,
  MouseEventHandler,
} from "react";
import {
  Header,
} from "@/Presentation/Component";
import { GetCalenderUseCase } from '@/Domain/UseCase';
import { CalenderRepositoryImpl, CredentialRepositoryImpl } from "@/Data/Repository";
import { CalenderEntity } from "@/Domain/Entity";
import MontlyCalendar from './customCalendar';

import style from "@/Presentation/Style/Main.module.css";
import "react-calendar/dist/Calendar.css";


const Main = () => {
  const getCalenderUseCase = new GetCalenderUseCase(new CalenderRepositoryImpl(), new CredentialRepositoryImpl());
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [calender, setCalender] = useState<CalenderEntity | null>();

  const getList = async () => {
    const e = (endDate === null)? (startDate) : (endDate);
    try {
      const data = await getCalenderUseCase.execute(startDate, e);
      setCalender(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getList();
  }, [])
  useEffect(() => {
    getList();
  }, [startDate, endDate])
  return (
    <div className={style.Main}>
      <Header />
      <div className={style.MonthandDay}>
        <div className={style.ContentBox}>
          <h2>일정 목록</h2>
        </div>
        <div className={style.CalenderBox}>
            <MontlyCalendar
              startDate={startDate}
              endDate={endDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
            />
        </div>
      </div>
    </div>
  );
};
export default Main;
