import { ChangeEventHandler, MouseEventHandler } from "react";

type TodoProps = {
    key : number;
    label : number;
    startTime : string;
    endTime : string;
    name: string;
    isTodoCheck: boolean;
    value : number;
    checked : boolean | undefined;
    onChange : ChangeEventHandler<HTMLInputElement>;
}

export type {
    TodoProps
};