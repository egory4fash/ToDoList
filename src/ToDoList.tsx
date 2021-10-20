import React from 'react';
import {FilterValuesType, TaskType} from "./App";

//typing
type ToDoListPropsType = {
    title: string;
    tasks: Array<TaskType>
    removeTask: (taskID: number) => void
    changeFilter: (filter: FilterValuesType) => void
}
//main
const ToDoList = (props: ToDoListPropsType) => {
    const tasksJSXElements = props.tasks.map(task => {
        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isdone}/>
                <span>{task.title}</span>
                <button onClick={() => props.removeTask(task.id)}>x</button>
            </li>
        )

    })
    //up to App
    return (
        <div className='todoList'>
            <h3>{props.title}</h3>
            <ul>
                {tasksJSXElements}
            </ul>

            <div>
                <input/>
                <button>+</button>
            </div>

            <div>
                <button
                    onClick={() => props.changeFilter('all')}>All
                </button>
                <button
                    onClick={() => props.changeFilter('active')}>Active
                </button>
                <button
                    onClick={() => props.changeFilter('completed')}>Completed
                </button>
            </div>
        </div>
    )
}

export default ToDoList;