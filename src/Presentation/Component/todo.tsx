import { TodoProps } from "@/Presentation/Type";
import style from '@/Presentation/Style/Todo.module.css'
import React, { ChangeEventHandler, MouseEventHandler, useState } from "react";
import Button from "./button";

const Todo = ({ todoName, isTodoCheck }: TodoProps) => {
    // isTodoCheck === false, make progress bar
    const [sliderValue, setSliderValue] = useState(0);
    const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseInt(event.target.value, 10);
        setSliderValue(newValue);
    };
    const calculateFillPercentage = () => { return (sliderValue / 100) * 100; };

    // isTodoCheck ===true, make toggle button 
    const [ isDone, setIsDone ] = useState(false);
    const handleDone:MouseEventHandler<HTMLButtonElement> = (e) => {
        setIsDone((prev)=>!prev);
    }
    if (isTodoCheck) {
        return (
            <div className={style.TodoCheck}>
                <h2>{todoName}</h2>
                <button style={{width:"20px", height:"20px", backgroundColor:"#255Ac1"}} 
                onClick={handleDone}/>
            </div>)
    } else {
        return (
            <div className={style.TodoProgress}>
                <h2>{todoName}</h2>
                <input
                    type="range"
                    min={0}
                    max={100}
                    step={10}
                    value={sliderValue}
                    onChange={handleSliderChange}
                    style={{
                        background: `linear-gradient(to right, #3498db 0%, #3498db ${calculateFillPercentage()}%, #ecf0f1 ${calculateFillPercentage()}%, #ecf0f1 100%)`,
                    }}
                />
                <div>Progress: {sliderValue}/{100}</div>
            </div>
        );
    }
    
}

export default Todo;


