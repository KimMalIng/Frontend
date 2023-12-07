import React, { MouseEventHandler, useState, ChangeEventHandler } from 'react';
import { Button, Input, Header } from '@/Presentation/Component';
import { useRouter } from 'next/router';
import Datepicker from 'react-datepicker';
import { CalenderModel } from '@/Presentation/Model';

import 'react-datepicker/dist/react-datepicker.css';
import style from '@/Presentation/Style/NewTask.module.css';

const NewTask = () => {
  const [taskName, setTaskName] = useState('');
  const [time, setTime] = useState(0);
  const [deadLine, setDeadLine] = useState<Date>(new Date());
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(1);
  const router = useRouter();
  const cModel = new CalenderModel();

  const onTaskNameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setTaskName(e.target.value);
  };

  const handleOptionChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    if(!isNaN(Number(e.target.value))) setSelectedOption(Number(e.target.value));
  };

  const handleButtonClick: MouseEventHandler<HTMLButtonElement> = async (e) => {
    await cModel.saveCalender(1, taskName, selectedOption, deadLine, time);
    setTimeout(async () => {
        await cModel.adjustmentCalender();
        router.push('./main');
    }, 10);
  };

  const onTimeChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if(!isNaN(Number(e.target.value))) setTime(Number(e.target.value));
  }

  return (
    <div className={style.body}>
      <Header />
      <div className={style.ContentBox}>
        <p>새로운 일정 등록하기</p>
        <h5>일정 이름을 입력하세요 :</h5>
        <Input
            type="id"
            width="100%"
            height="36px"
            text={taskName}
            fontSize="14px"
            placeHolder={''}
            onChange={onTaskNameChange}
        />
        <h5>제한 시간을 입력하세요 :</h5>
        <Input
            type="id"
            width="100%"
            height="36px"
            text={String(time)}
            fontSize="14px"
            placeHolder={''}
            onChange={onTimeChange}
        />
        <h5>일정의 종류를 선택해주세요 :</h5>
        <select value={selectedOption} onChange={handleOptionChange}>
            <option value="6" selected>학습(공부)</option>
            <option value="1">과제</option>
            <option value="5">근무(알바,근로)</option>
            <option value="3">여가</option>
            <option value="4">운동(헬스, 소모임)</option>
            <option value="2">약속(술약속, 미팅)</option>
        </select>
        <h5>마감일을 선택해주세요 :</h5>
        <Datepicker
            className={style.DatePicker}
            selected={deadLine}
            onChange={(date: Date) => {
              setDeadLine(date);
            }}
            dateFormat="yyyy.MM.dd"
            onSelect={() => {
              setDatePickerOpen(false); // Close the Datepicker when a date is selected
            }}
        />
        <div className={style.PlusBox}>
            
        </div>
        <Button
          width="100%"
          height="42px"
          fontSize="14px"
          backgroundColor="#49A078"
          color="#FFF"
          imgsrc="#"
          onClick={handleButtonClick}
        >
          등록하기
        </Button>
      </div>
    </div>
  );
};
export default NewTask;
