import React, {useState} from 'react';
import './App.css';
import ToDoList from "./ToDoList";

export type TaskType = {
    id:number,
    title:string,
    isdone:boolean
};

function App() {
    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id : 1,title:"HTML",isdone:true},
        {id : 2,title:"CSS",isdone:true},
        {id : 3,title:"React",isdone:false},
        {id : 4,title:"Redux",isdone:false},
    ])
    /*let tasks: Array<TaskType> = [
        {id : 1,title:"HTML",isdone:true},
        {id : 2,title:"CSS",isdone:true},
        {id : 3,title:"React",isdone:false},
        {id : 4,title:"Redux",isdone:false},
    ];*/

    const removeTask = (taskID: number) => {
        setTasks(tasks.filter(t=> t.id !== taskID))



    }



    return (
        <div className="App">
            <ToDoList
                title={"What to learn"}
                tasks={tasks}
                removeTask={removeTask}
            />

        </div>
    );
}

export default App;
