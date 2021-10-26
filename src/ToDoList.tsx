import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from "./App";

//typing
type ToDoListPropsType = {
    title: string;
    tasks: Array<TaskType>
    removeTask: (taskID: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
}
//main

const ToDoList = (props: ToDoListPropsType) => {
    const [title, setTitle] = useState<string>("")
    const tasksJSXElements = props.tasks.map(task => {
        const onClickRemoveHandler = () => props.removeTask(task.id)
        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isdone}/>
                <span>{task.title}</span>
                <button onClick={onClickRemoveHandler}>x</button>
            </li>
        )


    })
    const addTask = () => {
        if (title) {
            props.addTask(title)
            setTitle("")
        }
    }
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    const onPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.charCode === 13) {
            addTask()
        }
    }
    const onClickAllHandler = () => props.changeFilter('all')
    const onClickActiveHandler = () => props.changeFilter('active')
    const onClickCompletedHandler = () => props.changeFilter('completed')



    //up to App
    return (
        <div className='todoList'>

            <h3>{props.title}</h3>

            <div>
                <input
                    value={title}
                    placeholder="enter task"
                    onChange={onChangeHandler}
                    onKeyPress={onPressHandler}
                />
                <button onClick={addTask}>+</button>
            </div>

            <ul>
                {tasksJSXElements}
            </ul>

            <div>
                <button onClick={onClickAllHandler}>All</button>
                <button onClick={onClickActiveHandler}>Active</button>
                <button onClick={onClickCompletedHandler}>Completed</button>
            </div>

        </div>
    )
}

export default ToDoList;