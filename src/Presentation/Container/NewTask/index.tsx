import { Button, Input } from "@/Presentation/Component";
import React, { MouseEventHandler } from "react";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ChangeEventHandler, useState } from "react";
import style from "@/Presentation/Style/NewTask.module.css"

const NewTask = () => {

    const [taskName, setTaskName] = useState("");
    const onTaskNameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setTaskName(e.target.value);
    }

    const [ deadLine, setDeadLine ] = useState<Date>(new Date());
    const [ datePickerOpen , setDatePickerOpen ] = useState(false);

    const [selectedOption, setSelectedOption] = useState("");
    const handleOptionChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
        setSelectedOption(e.target.value)
    };

    const handleButtonClick: MouseEventHandler<HTMLButtonElement> = () => {
    }

    return (
        <div className={style.body}>
            <div className={style.ContentBox}>
                <p>새로운 일정 등록하기</p>
                <label className={style.NameLabel}>일정 이름을 입력하세요 : 
                <input
                    width="300px"
                    height="50px"
                    placeholder="예시) 컴퓨터구조 과제"
                    value={taskName}
                    onChange={onTaskNameChange}
                    type="task"
                /></label>
                <label className={style.SelectLabel}>일정의 종류를 선택해주세요 : 
                    <select value={selectedOption} onChange={handleOptionChange}>
                        <option value="">선택하기 ▾</option>
                        <option value="1">학습(공부)</option>
                        <option value="2">과제</option>
                        <option value="3">근무(알바,근로)</option>
                        <option value="4">여가(운동을 제외한!)</option>
                        <option value="5">운동(헬스, 소모임)</option>
                        <option value="6">약속(술약속, 미팅)</option>
                    </select>
                </label>
                <label className={style.SelectLabel}>마감일을 선택해주세요 :
                    <Datepicker 
                        className={style.DatePicker}
                        selected={deadLine} 
                        onChange={(date:Date) => {
                            setDeadLine(date);
                        }} 
                        dateFormat="yyyy.MM.dd"
                        onSelect={() => {
                            setDatePickerOpen(false); // Close the Datepicker when a date is selected
                        }}
                    />
                </label>
            <Button
                width="150px"
                height="35px"
                fontSize="14px"
                backgroundColor="#49A078"
                color="#FFF"
                imgsrc="#"
                onClick={handleButtonClick}
            >등록하기</Button>
            </div>
        </div>
    )
};
export default NewTask;