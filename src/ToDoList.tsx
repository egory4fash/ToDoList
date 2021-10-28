import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {Button} from "./components/Button";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    //changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState("")

    const addTask = () => {
        props.addTask(title);
        setTitle("");
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask();
        }
    }

    const tsarFunc = (value: FilterValuesType) => {
        changeFilter(value)
    }

    const onClickHandler = (tID: string) => {
        props.removeTask(tID)
    }
    let [filter, setFilter] = useState<FilterValuesType>("all");

    let tasksForTodolist = props.tasks;

    if (filter === "active") {
        tasksForTodolist = props.tasks.filter(t => t.isDone === false);
    }
    if (filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.isDone === true);
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
            />
            <Button callBack={() => addTask()} name={"+"}/>

        </div>
        <ul>
            {
                tasksForTodolist.map(t => {


                    return <li key={t.id}>
                        <input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        <Button callBack={() => onClickHandler(t.id)} name={'x'}/>
                    </li>
                })
            }
        </ul>
        <div>
            <Button name='all' callBack={() => tsarFunc('all')}/>
            <Button name='active' callBack={() => tsarFunc('active')}/>
            <Button name='complete' callBack={() => tsarFunc('completed')}/>

        </div>
    </div>
}
