import React, {useState} from 'react';
import './App.css';
import ToDoList from "./ToDoList";
import {v1} from 'uuid'

//typing
export type TaskType = {
    id: string,
    title: string,
    isdone: boolean
};

export type FilterValuesType = "all" | "active" | "completed"

//App main

function App() {
    //useState
    console.log(v1())
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML", isdone: true},
        {id: v1(), title: "CSS", isdone: true},
        {id: v1(), title: "React", isdone: false},
        {id: v1(), title: "Redux", isdone: false},
    ])

    const [filter, setFilter] = useState<FilterValuesType>('all')

    //functions
    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isdone :false
        }
        setTasks([...tasks,newTask])
    }
    const removeTask = (taskID: string) => {
        setTasks(tasks.filter(t => t.id !== taskID))
    }

    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    //conditions
    let tasksForRender = tasks
    if (filter === 'active') {
        tasksForRender = tasks.filter(t => !t.isdone) //false
    }
    if (filter === 'completed') {
        tasksForRender = tasks.filter(t => t.isdone)  //true
    }

    //send to ToDoList
    return (
        <div className="App">
            <ToDoList
                title={"What to learn"}
                tasks={tasksForRender}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask ={addTask}
            />
        </div>
    )
}


export default App;
