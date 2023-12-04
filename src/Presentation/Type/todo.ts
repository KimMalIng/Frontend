import { ChangeEventHandler, MouseEventHandler } from "react";

type TodoProps = {
    key : number;
    label : number;
    startTime : string;
    endTime : string;
    name: string;
    todoType: string;
    value : number | undefined;
    checked : boolean | undefined;
}

export type {
    TodoProps
};