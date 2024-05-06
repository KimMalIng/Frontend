import React, { MouseEventHandler, useState, ChangeEventHandler, useEffect } from "react";
import * as Switch from '@radix-ui/react-switch';
import { Toast } from "@/Presentation/Component";
import { useRouter } from "next/router";
import TimeInput from './timeInput';
import PeriodInput from './periodInput';

import "react-datepicker/dist/react-datepicker.css";
import style from "@/Presentation/Style/NewTask.module.css";

const NewTask = ({ }) => {
  const router = useRouter();
  const [taskName, setTaskName] = useState("");
  const [isAuto, setIsAuto] = useState(true);
  const [isClear, setIsClear] = useState(false);
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [expectTime, setExpectTime] = useState(0);

  const handleTaskName: ChangeEventHandler<HTMLInputElement> = (e) => { 
    setTaskName(e.target.value); 
  };
  const handleIsAuto = (checked: boolean) => {
    setIsAuto(checked);
    setIsToastOpen(false);
  }
  const handleIsClear = (checked: boolean) => {
    if(isAuto){
      setIsToastOpen(true);
      return;
    }
    setIsClear(checked);
  }
  const setToastOpen = (open: boolean) => {
    setIsToastOpen(open);
  }

  const handleButtonClick: MouseEventHandler<HTMLButtonElement> = async (e) => {
    // await cModel.saveCalender(1, taskName, selectedOption, deadLine, time);
    // setTimeout(async () => {
    //   await cModel.adjustmentCalender();
    // }, 10);
  };
  const handleExpectTime = (val: any) => { setExpectTime(val); };

  return (
    <div className={style.NewTask}>
      <Toast
        iconType="fail"
        title="실패"
        text="자동 스케쥴링에서는 사용할 수 없습니다"
        isOpen={isToastOpen}
        setIsOpen={setToastOpen}
      />
      <input 
        type="text"
        value={taskName}
        onChange={handleTaskName}
        className={style.TaskNameInput}
        placeholder="일정 이름을 입력해주세요"
      />

      <div className={style.SwitchBox}>
        <p>자동 스케쥴링</p>
        <Switch.Root 
          className={style.SwitchRoot}
          checked={isAuto}
          onCheckedChange={handleIsAuto}
        >
          <Switch.Thumb className={style.SwitchThumb} />
        </Switch.Root>
      </div>

      <div className={style.SwitchBox}>
        <p>이후 일정 비우기</p>
        <Switch.Root 
          className={style.SwitchRoot}
          checked={isClear}
          onCheckedChange={handleIsClear}
        >
          <Switch.Thumb className={style.SwitchThumb} />
        </Switch.Root>
      </div>

      <div className={style.TimeBox}>
        {(isAuto)? (
         <TimeInput setExpectTime={handleExpectTime} />
        ) : (
          <>
            <TimeInput setExpectTime={handleExpectTime} />
            ~
            <TimeInput setExpectTime={handleExpectTime} />
          </>
        )}
      </div>
        {/* <div className={style.toggles_times}>
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
        </div> */}
    </div>
  );
};
export default NewTask;
