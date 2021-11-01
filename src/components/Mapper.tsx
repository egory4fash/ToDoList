import {Button} from "./Button";
import React from "react";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    tasksForToDoList: Array<TaskType>
    title:string
    callBack: (tID:string) => void

}
export const Mapper = (props: PropsType) => {


    return (
        <ul>
            {
                props.tasksForToDoList.map(t => {
                    return <li key={t.id}>
                        <input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        <Button callBack={() => props.callBack(t.id)} name={'x'}/>
                    </li>
                })
            }
        </ul>
    )
}