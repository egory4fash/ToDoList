import React, {useState} from 'react';
import {FilterValuesType} from './App';
import {Button} from "./components/Button";
import {Input} from "./components/Input";
import {Mapper} from "./components/Mapper";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    addTask: (title: string) => void
}

export function ToDoList(props: PropsType) {


    const tsarFunc = (value: FilterValuesType) => {
        changeFilter(value)
    }

    const changeFilter=(value: FilterValuesType) => {
        setFilter(value);
    }

    const onClickHandler = (tID: string) => {
        props.removeTask(tID)
    }
    let [filter, setFilter] = useState<FilterValuesType>("all");

    let tasksForTodolist = props.tasks;

    if (filter === "active") {
        tasksForTodolist = props.tasks.filter(t => !t.isDone);
    }
    if (filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.isDone);
    }

    let [title, setTitle] = useState("")

    const callBackHandlerForAddTask =() => {
        props.addTask(title)
        setTitle('')
    }
    return <div>
        <h3>{props.title}</h3>
        <Input setTitle = {setTitle} title={title} callBack={callBackHandlerForAddTask}/>
        <Button callBack={callBackHandlerForAddTask} name={"+"} />
        <Mapper tasksForToDoList = {tasksForTodolist}
                title = {title}
                callBack = {onClickHandler}
        />
        <div>
            <Button name='all' callBack={() => tsarFunc('all')}/>
            <Button name='active' callBack={() => tsarFunc('active')}/>
            <Button name='completed' callBack={() => tsarFunc('completed')}/>

        </div>
    </div>
}
//BREAKPOINT
