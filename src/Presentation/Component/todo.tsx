import { TodoProps } from "@/Presentation/Type";
import style from '@/Presentation/Style/Todo.module.css'
import React, { ChangeEventHandler, MouseEventHandler, useState } from "react";
import fixedPin from '../../fixedPin.svg';
import Button from "./button";

const Todo = ({ label, name, todoType, prevValue, checked, startTime, endTime }: TodoProps) => {
    const calculateFillPercentage = () => { if (sliderValue !== undefined) { return (sliderValue / 100) * 100; } };
    const [sliderValue, setSliderValue] = useState(prevValue);
    const handleSliderChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        const newValue = parseInt(e.target.value, 10);
        setSliderValue(newValue);
    };
    // isTodoCheck ===true, make toggle button 
    const [isDone, setIsDone] = useState(checked);
    const handleDone: ChangeEventHandler<HTMLInputElement> = (e) => { setIsDone(e.target.checked) }

    return (
        <div className={style.TodoBox}>
            <label className={style.TimeTable}>
                <p>{startTime}</p>
                <p>{endTime}</p>
            </label>
            <div className={style.TodoContainer}>
                <img src="#" alt="label"></img>
                <div className={sliderValue === 100 || isDone ? style.DoneTodoBody : style.TodoBody }>
                    {todoType === "fixed" ? <div className={style.TodoFixed}><p>{name}</p><img src={fixedPin} alt=" "/></div>
                        : todoType === "check" ?
                            (<div className={style.TodoCheck}>
                                <p>{name}</p>
                                <label className={style.CheckboxLabel}>
                                    <input
                                        id="checkbox"
                                        type="checkbox"
                                        onChange={handleDone}
                                    />
                                    <span className={style.CheckboxCustom}></span>
                                </label>
                            </div>)
                            : (<div className={style.TodoProgress}>
                                <p>{name}</p>
                                <input className={style.ProgressBar}
                                    type="range"
                                    min={0}
                                    max={100}
                                    step={10}
                                    value={sliderValue}
                                    onChange={handleSliderChange}
                                    style={{ background: `linear-gradient(to right, #49A078 0%, #49A078 ${calculateFillPercentage()}%, #ecf0f1 ${calculateFillPercentage()}%, #ecf0f1 100%)` }}
                                />
                                <div>현재 수행률 : {sliderValue}%</div>
                            </div>)}
                </div>
            </div>
        </div>
    )
}

export default Todo;


