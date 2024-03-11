import React, { MouseEventHandler, useState, ChangeEventHandler } from 'react';
import { Button, Input, Header } from '@/Presentation/Component';
import { useRouter } from 'next/router';
import Datepicker from 'react-datepicker';
import { CalenderModel } from '@/Presentation/Model';

import 'react-datepicker/dist/react-datepicker.css';
import style from '@/Presentation/Style/NewTask.module.css';

interface NewTaskProps {
  closeModal: () => void;
}

const NewTask: React.FC<NewTaskProps> = ({ closeModal }) => {

  const [taskName, setTaskName] = useState('');
  const [time, setTime] = useState(0);
  const [deadLine, setDeadLine] = useState<Date>(new Date());
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(0);
  const router = useRouter();
  const cModel = new CalenderModel();

  const onTaskNameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setTaskName(e.target.value);
  };

  const handleOptionChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    if (!isNaN(Number(e.target.value))) setSelectedOption(Number(e.target.value));
  };

  const handleButtonClick: MouseEventHandler<HTMLButtonElement> = async (e) => {
    await cModel.saveCalender(1, taskName, selectedOption, deadLine, time);
    setTimeout(async () => {
      await cModel.adjustmentCalender();
      router.push('./main');
    }, 10);
  };

  const onTimeChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!isNaN(Number(e.target.value))) setTime(Number(e.target.value));
  }

  return (
    <div className={style.body}>
      <div className={style.ContentBox}>
        <p>새로운 일정 등록하기</p>

        <div className={style.NewTaskInputs}>
          <p>일정 이름 </p>
          <Input
            type="id"
            width="100%"
            height="42px"
            text={taskName}
            fontSize="16px"
            placeHolder={'일정 이름을 입력하세요'}
            onChange={onTaskNameChange}
          />
        </div>

        <div className={style.NewTaskInputs}>
          <p>예상 소요시간</p>
          <Input
            type="id"
            width="100%"
            height="42px"
            text={String(time)}
            fontSize="16px"
            placeHolder={'분 단위'}
            onChange={onTimeChange}
          />
        </div>

        <div className={style.NewTaskInputs}>
          <p>일정 분류</p>
          <select value={selectedOption} onChange={handleOptionChange} defaultValue={0}>
            `아니 여기 controlled or uncontrolled 속성 어디에 입력하라는거야`
            <option value="0" className={style.SelectClassify} selected>분류를 선택하세요</option>
            <option value="1">과제</option>
            <option value="2">약속(술약속, 미팅)</option>
            <option value="3">여가</option>
            <option value="4">운동(헬스, 소모임)</option>
            <option value="5">근무(알바,근로)</option>
            <option value="6">학습(공부)</option>
          </select>
        </div>

        <div className={style.NewTaskInputs}>
          <p>마감일</p>
          <Datepicker
            className={style.DatePicker}
            selected={deadLine}
            onChange={(date: Date) => {
              setDeadLine(date);
            }}
            dateFormat="yyyy.MM.dd"
            shouldCloseOnSelect
          />
        </div>

        <div className={style.PlusBox}>

        </div>
        <div className={style.ReOrCan}>
          <Button
            width="70%"
            height="42px"
            fontSize="14px"
            backgroundColor="#49A078"
            color="#FFF"
            imgsrc="#"
            onClick={(e) => {
              handleButtonClick(e);
              closeModal();
            }}
          >
            등록하기
          </Button>
          <Button
            width="25%"
            height="42px"
            fontSize="14px"
            backgroundColor="#FFF"
            color="#49A078"
            imgsrc="#"
            onClick={closeModal}
          >
            취소하기
          </Button>
        </div>
      </div>
    </div>
  );
};
export default NewTask;
