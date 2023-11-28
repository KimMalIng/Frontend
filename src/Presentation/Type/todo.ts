import { ChangeEventHandler, MouseEventHandler } from "react";

type TodoProps = {
    todoName: string;
    isTodoCheck: boolean;
    value : number;
    checked : boolean | undefined;
    onChange : ChangeEventHandler<HTMLInputElement>;
}

export type {
    TodoProps
};