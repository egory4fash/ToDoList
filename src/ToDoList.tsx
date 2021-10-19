import React from 'react';
import {TaskType} from "./App";

type ToDoListPropsType = {
    title:string;
    tasks: Array<TaskType>
    removeTask: (taskID :number) => void
}

const ToDoList = (props: ToDoListPropsType)=> {
    const tasksJSXElements = props.tasks.map(task=> {
        return (
            <li key={task.id}>
            <input type="checkbox" checked={task.isdone}/>
            <span>{task.title}</span>
                <button onClick={()=>props.removeTask(task.id)}>x</button>
            </li>
        )

    })
    return (
        <div className = 'todoList'>
            <h3>{props.title}</h3>
            <ul>
                {tasksJSXElements}
            </ul>
            <div>
                <input/>
                <button>+</button>
            </div>

            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}

export default ToDoList;