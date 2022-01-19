import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType} from './App';

import EditableSpan from "./Components/EditableSpan";
import Input from "./Components/Input";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    filter: FilterValuesType
    updateTask:(todolistId: string,id: string,LocalTitle:string)=>void
}

export function Todolist(props: PropsType) {

    let [editMode,setEditMode] = useState(false)

    const removeTodolist = () => props.removeTodolist(props.id)
    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);
    const callbackHandler=(title: string)=>{
        props.addTask(title,props.id)
    }
const titleHandler (title:string)



    const mappedElems =    props.tasks.map(t => {
        const onClickHandler = () => props.removeTask(t.id, props.id)
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked;
            props.changeTaskStatus(t.id, newIsDoneValue, props.id);
        }
        const callBackForEditableSpanHandler=(title: string)=>{
            props.updateTask(props.id,t.id,title)
        }

        return <li key={t.id} className={t.isDone ? "is-done" : ""}>
            <input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>

            <EditableSpan title={t.title} callBackForEditableSpan={callBackForEditableSpanHandler}/>
            <button onClick={onClickHandler}>x</button>
        </li>
    })

    return <div>
        <EditableSpan title={props.title} callBackForEditableSpan={x => x} />
            <button onClick={removeTodolist}>x</button>

        <div>
            <Input callback={callbackHandler}/>
                </div>
        <ul>
            {mappedElems}
        </ul>
        <div>
            <button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
            </button>
            <button className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}


