import React from 'react';
import './App.css';
import ToDoList from "./ToDoList";

export type TaskType = {
    id:number,
    title:string,
    isdone:boolean
};

function App() {
    const tasks1: Array<TaskType> = [
        {id : 1,title:"HTML",isdone:true},
        {id : 2,title:"CSS",isdone:false},
        {id : 3,title:"React",isdone:false},
    ];
    return (
        <div className="App">
            <ToDoList title={"What to learn"} tasks={tasks1}/>
            <ToDoList title ={"What to buy"} tasks={tasks1}/>
            <ToDoList title = {"What to read"} tasks={tasks1}/>
        </div>
    );
}

export default App;
