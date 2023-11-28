import { TodoProps } from "@/Presentation/Type";
import style from '@/Presentation/Style/Todo.module.css'
import React, { ChangeEventHandler, MouseEventHandler, useState } from "react";
import Button from "./button";

const Todo = ({ todoName, isTodoCheck, value, checked, onChange }: TodoProps) => {

    const calculateFillPercentage = () => { return (value / 100) * 100; };

    return (
        <div className={isTodoCheck ? style.TodoCheck : style.TodoProgress}>
            <h2>{todoName}</h2>
            {isTodoCheck ? (
                <label className={style.CheckboxLabel}>
                    <input
                        id="checkbox"
                        type="checkbox"
                        checked={checked}
                        onChange={onChange}
                    />
                    <span className={style.CheckboxCustom}></span>
                </label>) : (
                <div>
                    <input
                        type="range"
                        min={0}
                        max={100}
                        step={10}
                        value={value}
                        onChange={onChange}
                        style={{ background: `linear-gradient(to right, #3498db 0%, #3498db ${calculateFillPercentage()}%, #ecf0f1 ${calculateFillPercentage()}%, #ecf0f1 100%)` }}
                    />
                    <div>Progress: {value}/{100}</div>
                </div>)}
        </div>
    )
}

export default Todo;


