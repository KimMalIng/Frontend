import React, { MouseEventHandler, useState, ChangeEventHandler } from "react";
import { NewTaskProps } from '@/Presentation/Type';
import cn from 'classnames';
import * as Switch from '@radix-ui/react-switch';
import { Toast } from "@/Presentation/Component";
import { SaveCalenderUseCase } from '@/Domain/UseCase';
import { CalenderRepositoryImpl, CredentialRepositoryImpl } from '@/Data/Repository';

import "react-datepicker/dist/react-datepicker.css";
import style from "@/Presentation/Style/NewTask.module.css";

const NewTask = ({ startDate, endDate }: NewTaskProps) => {
  const saveCalenderUseCase = new SaveCalenderUseCase(new CalenderRepositoryImpl(), new CredentialRepositoryImpl());
  const [taskName, setTaskName] = useState("");
  const [isAuto, setIsAuto] = useState(true);
  const [isClear, setIsClear] = useState(false);
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [isRequestErrorToastOpen, setIsRequestErrorToastOpen] = useState(false);
  const [startHour, setStartHour] = useState("00");
  const [startMinute, setStartMinute] = useState("00");
  const [endHour, setEndHour] = useState("00");
  const [endMinute, setEndMinute] = useState("00");

  const handleTaskName: ChangeEventHandler<HTMLInputElement> = (e) => { 
    setTaskName(e.target.value); 
  };
  const handleIsAuto = (checked: boolean) => {
    setIsAuto(checked);
    setIsToastOpen(false);
    setStartHour("00");
    setStartMinute("00");
    setEndHour("00");
    setEndMinute("00");
  }
  const handleIsClear = (checked: boolean) => {
    if(isAuto){
      setIsToastOpen(true);
      return;
    }
    setIsClear(checked);
    setIsRequestErrorToastOpen(false);
  }
  const handleStartHour: ChangeEventHandler<HTMLInputElement> = (e) => {
    setIsRequestErrorToastOpen(false);
    if(isNaN(Number(e.target.value))) return;
    if(Number(e.target.value) < 10) {
      const n = Number(e.target.value);
      setStartHour('');
      setStartHour(`0${n}`)
    }
    else setStartHour(String(Number(e.target.value)));
  }
  const handleStartMinute: ChangeEventHandler<HTMLInputElement> = (e) => {
    setIsRequestErrorToastOpen(false);
    if(isNaN(Number(e.target.value))) return;
    if(isNaN(Number(startMinute))) return;
    if(Number(e.target.value) < Number(startMinute)){
      if(Number(e.target.value) < 0) return;
      setStartMinute(`${Math.floor(Number(e.target.value) / 10) * 10}`)
    }
    else {
      if(Number(e.target.value) > 50) return;
      setStartMinute(`${Math.ceil(Number(e.target.value) / 10) * 10}`)
    }
  }
  const handleEndHour: ChangeEventHandler<HTMLInputElement> = (e) => {
    setIsRequestErrorToastOpen(false);
    if(isNaN(Number(e.target.value))) return;
    if(Number(e.target.value) < 10) {
      const n = Number(e.target.value);
      setEndHour('');
      setEndHour(`0${n}`)
    }
    else setStartHour(String(Number(e.target.value)));
  }
  const handleEndMinute: ChangeEventHandler<HTMLInputElement> = (e) => {
    setIsRequestErrorToastOpen(false);
    if(isNaN(Number(e.target.value))) return;
    if(isNaN(Number(endMinute))) return;
    if(Number(e.target.value) < Number(endMinute)){
      if(Number(e.target.value) < 0) return;
      setEndMinute(`${Math.floor(Number(e.target.value) / 10) * 10}`)
    }
    else {
      if(Number(e.target.value) > 50) return;
      setEndMinute(`${Math.ceil(Number(e.target.value) / 10) * 10}`)
    }
  }

  const setToastOpen = (open: boolean) => {
    setIsToastOpen(open);
  }
  
  const setRequestErrorToastOpen = (open: boolean) => {
    setRequestErrorToastOpen(open);
  }

  const handleSaveButtonClick: MouseEventHandler<HTMLDivElement> = async (e) => {
    try {
      const e = (endDate === null)? (startDate) : (endDate);
      await saveCalenderUseCase.execute(
        taskName,
        1,
        startDate,
        e,
        `${startHour}:${startMinute}`
      );
    } catch (error) {
      console.log(error);
      setIsRequestErrorToastOpen(true)
    }
  };

  return (
    <div className={style.NewTask}>
      <Toast
        iconType="fail"
        title="실패"
        text="자동 스케쥴링에서는 사용할 수 없습니다"
        isOpen={isToastOpen}
        setIsOpen={setToastOpen}
      />
      <Toast
        iconType="fail"
        title="실패"
        text="정보를 정확히 입력해주세요"
        isOpen={isRequestErrorToastOpen}
        setIsOpen={setRequestErrorToastOpen}
      />
      <input 
        type="text"
        value={taskName}
        onChange={handleTaskName}
        className={style.TaskNameInput}
        placeholder="일정 이름을 입력해주세요"
      />

      <div className={style.SwitchBox}>
        <p className={style.SwitchText}>자동 스케쥴링</p>
        <Switch.Root 
          className={style.SwitchRoot}
          checked={isAuto}
          onCheckedChange={handleIsAuto}
        >
          <Switch.Thumb className={style.SwitchThumb} />
        </Switch.Root>
      </div>

      <div className={style.SwitchBox}>
        <p className={style.SwitchText}>이후 일정 비우기</p>
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
          <>
            <h2 className={style.TimeBoxTitle}>필요시간 지정하기</h2>
            <div className={style.NumberInputBox}>
              <input 
                type="number" 
                value={startHour}
                onChange={handleStartHour}
                className={style.NumberInput}
              />
              <h2 className={style.NumberInputSlice}> : </h2>
              <input
                type="number" 
                value={startMinute}
                onKeyDown={() => false}
                onKeyUp={() => false}
                onChange={handleStartMinute}
                className={style.NumberInput}
              />
            </div>
          </>
        ) : (
          <>
            <h2 className={style.TimeBoxTitle}>시작시간 지정하기</h2>
            <div className={style.NumberInputBox}>
              <input 
                type="number" 
                value={startHour}
                onChange={handleStartHour}
                className={style.NumberInput}
              />
              <h2 className={style.NumberInputSlice}> : </h2>
              <input
                type="number" 
                value={startMinute}
                onKeyDown={() => false}
                onKeyUp={() => false}
                onChange={handleStartMinute}
                className={style.NumberInput}
              />
            </div>
            <h2 className={style.TimeBoxTitle}>종료시간 지정하기</h2>
            <div className={style.NumberInputBox}>
              <input 
                type="number" 
                value={endHour}
                onChange={handleEndHour}
                className={style.NumberInput}
              />
              <h2 className={style.NumberInputSlice}> : </h2>
              <input
                type="number" 
                value={endMinute}
                onKeyDown={() => false}
                onKeyUp={() => false}
                onChange={handleEndMinute}
                className={style.NumberInput}
              />
            </div>
  
          </>
        )}
         <div className={style.btnBox}>
          <div 
            className={cn(style.btn, style.save)}
            onClick={handleSaveButtonClick}
          >
            저장하기
          </div>
        </div>
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
