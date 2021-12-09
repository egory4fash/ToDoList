import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {Mapper} from "./Mapper";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
todolistID: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string,todolistID: string) => void
    changeFilter: (value: FilterValuesType,todolistID: string) => void
    addTask: (title: string,todolistID: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean,todolistID: string) => void
    filter: FilterValuesType
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim() !== "") {
            props.addTask(title.trim(),props.todolistID);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addTask();
        }
    }

    const onAllClickHandler = () => props.changeFilter("all",props.todolistID);
    const onActiveClickHandler = () => props.changeFilter("active",props.todolistID);
    const onCompletedClickHandler = () => props.changeFilter("completed",props.todolistID);


    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
            />
            <button onClick={addTask}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>
       <Mapper
           tasks={props.tasks}
           todolistID={props.todolistID}
           removeTask={props.removeTask}
           changeTaskStatus={props.changeTaskStatus}/>
        <div>
            <button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All</button>
            <button className={props.filter === 'active' ? "active-filter" : ""}
                onClick={onActiveClickHandler}>Active</button>
            <button className={props.filter === 'completed' ? "active-filter" : ""}
                onClick={onCompletedClickHandler}>Completed</button>
        </div>
    </div>
}
