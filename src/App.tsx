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

    const tasks2: Array<TaskType> = [
        {id : 1,title:"Meat",isdone:true},
        {id : 2,title:"Meat again",isdone:false},
        {id : 3,title:"More meat",isdone:false},
    ];
    const tasks3: Array<TaskType> = [
        {id : 1,title:"Beer",isdone:true},
        {id : 2,title:"Vodka",isdone:false},
        {id : 3,title:"Smth unusual",isdone:false},
    ];

    return (
        <div className="App">
            <ToDoList title={"What to learn"} tasks={tasks1}/>
            <ToDoList title ={"What to eat"} tasks={tasks2}/>
            <ToDoList title = {"What to drink"} tasks={tasks3}/>
        </div>
    );
}

export default App;
