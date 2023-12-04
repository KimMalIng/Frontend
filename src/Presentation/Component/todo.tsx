import { TodoProps } from "@/Presentation/Type";
import style from '@/Presentation/Style/Todo.module.css'
import React, { ChangeEventHandler, MouseEventHandler, useState } from "react";
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
    const setDone = (boo: boolean) => {
        setIsDone(boo => !boo);
    }
    const handleDone: ChangeEventHandler<HTMLInputElement> = (e) => { setDone(e.target.checked) }

    return (
        <div className={style.TodoBox}>
            <label>
                <p>{startTime}</p>
                <p>{endTime}</p>
            </label>
            <h2>{name}</h2>
            {todoType === "fixed" ?
                null : todoType === "check" ? (
                    <div className={style.TodoCheck}>
                        <label className={style.CheckboxLabel}>
                            <input
                                id="checkbox"
                                type="checkbox"
                                onChange={handleDone}
                            />
                            <span className={style.CheckboxCustom}></span>
                        </label>
                    </div>) : (
                    <div className={style.TodoProgress}>
                        <input
                            type="range"
                            min={0}
                            max={100}
                            step={10}
                            value={sliderValue}
                            onChange={handleSliderChange}
                            style={{ background: `linear-gradient(to right, #3498db 0%, #3498db ${calculateFillPercentage()}%, #ecf0f1 ${calculateFillPercentage()}%, #ecf0f1 100%)` }}
                        />
                        <div>Progress: {sliderValue}/{100}</div>
                    </div>)}
        </div>
    )
}

export default Todo;


