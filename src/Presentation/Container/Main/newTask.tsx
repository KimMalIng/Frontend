import React, { MouseEventHandler, useState, ChangeEventHandler, useEffect } from "react";
import { Button, Input, Header } from "@/Presentation/Component";
import { useRouter } from "next/router";
import TimeInput from './timeInput';
import PeriodInput from './periodInput';

import "react-datepicker/dist/react-datepicker.css";
import style from "@/Presentation/Style/NewTask.module.css";

interface NewTaskProps {
  closeModal: () => void;
  clearDeadLine: () => void;
}

const NewTask: React.FC<NewTaskProps> = ({ closeModal, clearDeadLine}) => {
  const [taskName, setTaskName] = useState("");
  const [selectedOption, setSelectedOption] = useState(0);
  const router = useRouter();
  const [autoSchedule, setautoSchedule] = useState(true);
  const [shouldClear, setClear] = useState(false);
  const [expectTime, setExpectTime] = useState(0);

  const addNewTask: MouseEventHandler<HTMLButtonElement> = () => {  };

  const onTaskNameChange: ChangeEventHandler<HTMLInputElement> = (e) => { setTaskName(e.target.value); };

  const handleButtonClick: MouseEventHandler<HTMLButtonElement> = async (e) => {
    // await cModel.saveCalender(1, taskName, selectedOption, deadLine, time);
    // setTimeout(async () => {
    //   await cModel.adjustmentCalender();
    // }, 10);
    closeModal();
    clearDeadLine();
  };
  const toggleHandler = () => { setautoSchedule((prev) => !prev); };
  const toggleClear = () => { setClear((prev) => !prev); };
  const handleExpectTime = (val: any) => { setExpectTime(val); };
  const handlePeriodTime = (val: any) => { };

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
          <button onClick={handleButtonClick}>Go!</button>
        </div>
        <div className={style.toggles_times}>
          <div className={style.toggles}>
            <span>일정 설정</span>
            <label className={style.toggle_switch}>
              <input type="checkbox" onChange={toggleHandler} checked={autoSchedule} />
              <span className={style.slider}>{autoSchedule ? "자동 스케줄링" : "고정일정 입력"}</span>
            </label>
            {autoSchedule && <p>⬆️ 버튼을 눌러 알바, 약속<br />등 고정 일정 추가하기 !</p>}
            {!autoSchedule &&
              <label className={style.toggle_switch}>
                <input type="checkbox" onChange={toggleClear} checked={shouldClear} />
                <span className={style.slider}>{shouldClear ? "이후 일정 비움" : "일과 정상 진행"}</span>
              </label>
            }
            {!autoSchedule && !shouldClear && <p>⬆️ 버튼을 눌러 이후 일정<br></br>마감하기 (술 약속 등등)</p>}

          </div>
          {autoSchedule ? <div className={style.ExpectTime}>
            <div className={style.TimeSetter}>
              <TimeInput setExpectTime={handleExpectTime} />
            </div>
          </div>
            : <div className={style.ExpectTime}>
              <div className={style.TimeSetter}>
                <PeriodInput />
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  );
};
export default NewTask;
