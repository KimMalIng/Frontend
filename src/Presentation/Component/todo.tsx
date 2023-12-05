import { TodoProps } from "@/Presentation/Type";
import style from '@/Presentation/Style/Todo.module.css'
import React, { ChangeEventHandler, MouseEventHandler, useEffect, useState } from "react";
import fixedPinImg from "./VectorPin.png";

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

    const [ labelColor, setLabelColor ] = useState("#A8D5FF");
    
    useEffect(()=> {
        colorByLabel(label);
    },[])

    const colorByLabel = (label:number) => {
        switch (label) {
            // 색깔 걍 아무거나 해놓음
            case 0 : setLabelColor("#A8D5FF"); break;
            case 1 : setLabelColor("#DDDDDD"); break;
            case 2 : setLabelColor("#FBE299"); break;
            case 3 : setLabelColor("#FF94A7"); break;
            case 4 : setLabelColor("#FFD4C1"); break;
            case 5 : setLabelColor("#9CC5A1"); break;
            default : setLabelColor("#A8D5FF"); break;
        }
    }

    return (
        <div className={style.TodoBox}>
            <label className={style.TimeTable}>
                <p>{startTime}</p>
                <p>{endTime}</p>
            </label>
            <div className={style.TodoContainer}>
                <div className={style.ColorLabel} style={{backgroundColor:labelColor}}></div>
                <div className={sliderValue === 100 || isDone ? style.DoneTodoBody : style.TodoBody }>
                    {todoType === "fixed" ? <div className={style.TodoFixed}><p>{name}</p></div>
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
                                <p>현재 수행률 : {sliderValue}%</p>
                            </div>)}
                </div>
            </div>
        </div>
    )
}

export default Todo;


