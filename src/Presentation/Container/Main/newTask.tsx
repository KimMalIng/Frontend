import React, { MouseEventHandler, useState, ChangeEventHandler } from "react";
import { Button, Input, Header } from "@/Presentation/Component";
import { useRouter } from "next/router";
import { CalenderModel } from "@/Presentation/Model";
import TimeInput from './temp';
import PeriodInput from './fixSchedule';

import "react-datepicker/dist/react-datepicker.css";
import style from "@/Presentation/Style/NewTask.module.css";

interface NewTaskProps {
  closeModal: () => void;
}

const NewTask: React.FC<NewTaskProps> = ({ closeModal }) => {
  const [taskName, setTaskName] = useState("");
  const [hour, setHour] = useState(0);
  const [deadLine, setDeadLine] = useState<Date>(new Date());
  const [selectedOption, setSelectedOption] = useState(0);
  const router = useRouter();
  const cModel = new CalenderModel();
  const [time, setTime] = useState(0);

  const addNewTask: MouseEventHandler<HTMLButtonElement> = () => {
    const data = {
      "":"",
      "":""
    };
  };

  const onTaskNameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setTaskName(e.target.value);
  };

  const handleButtonClick: MouseEventHandler<HTMLButtonElement> = async (e) => {
    await cModel.saveCalender(1, taskName, selectedOption, deadLine, time);
    setTimeout(async () => {
      await cModel.adjustmentCalender();
      router.push("./main");
    }, 10);
  };

  const [isOn, setIsOn] = useState(true); // 초기값: 꺼짐
  const toggleHandler = () => {
    setIsOn((prev) => !prev); // 버튼 클릭 시 상태 반전
  };

  const [shouldClear, setClear] = useState(false); // 초기값: 꺼짐
  const toggleClear = () => {
    setClear((prev) => !prev); // 버튼 클릭 시 상태 반전
  };

  return (
    <div className={style.body}>
      <div className={style.ContentBox}> 
        <div className={style.TaskName}>
          <Input
            type="text"
            width="240px"
            height="36px"
            text={taskName}
            fontSize="16px"
            placeHolder={"일정 이름을 입력해주세요"}
            onChange={onTaskNameChange}
          />
          <button
          >
          Go!</button>
        </div>
        <div className={style.toggles_times}>
          <div className={style.toggles}>
            <span>일정 설정</span>
            <label className={style.toggle_switch}>
              <input type="checkbox" onChange={toggleHandler} checked={isOn} />
              <span className={style.slider}>{isOn ? "자동 스케줄링" : "고정일정 입력"}</span>
            </label>
            {isOn && <p>⬆️ 버튼을 눌러 알바, 약속<br/>등 고정 일정 추가하기 !</p>}
            {!isOn &&
              <label className={style.toggle_switch}>
                <input type="checkbox" onChange={toggleClear} checked={shouldClear} />
                <span className={style.slider}>{shouldClear ? "이후 일정 비움" : "일과 정상 진행"}</span>
              </label>
            }
            {!isOn && !shouldClear && <p>⬆️ 버튼을 눌러 이후 일정<br></br>마감하기 (술 약속 등등)</p>}

          </div>
          {isOn ? <div className={style.ExpectTime}>
            <div className={style.TimeSetter}>
              <TimeInput />
            </div>
          </div>
            : <div className={style.ExpectTime}>
                <div className={style.TimeSetter}>
                  <PeriodInput toClear={shouldClear} />
                </div>
              </div>
          }
        </div>
      </div>
    </div>
  );
};
export default NewTask;
