import React from 'react';
import './App.css';
import {ToDoList} from "./ToDoList";

export type TaskType ={
    id:number,
    title: string,
    isDone: boolean
}

const tasks_1: Array<TaskType>=[
    {id:1,title:"HTML",isDone:true},
    {id:1,title:"CSS",isDone:true},
    {id:1,title:"React",isDone:true},
]



function App() {
    return (
        <div className="App">
            <ToDoList title={"How To Learn"} tasks ={tasks_1}/>
            {/*                                                      */}
        </div>
    );
}

export default App;
