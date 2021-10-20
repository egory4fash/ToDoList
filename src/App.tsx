import React, {useState} from 'react';
import './App.css';
import ToDoList from "./ToDoList";

export type TaskType = {
    id: number,
    title: string,
    isdone: boolean
};
export type FilterValuesType = "all" | "active" | "completed"

function App() {
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: "HTML", isdone: true},
        {id: 2, title: "CSS", isdone: true},
        {id: 3, title: "React", isdone: false},
        {id: 4, title: "Redux", isdone: false},
    ])
    const [filter, setFilter] = useState<FilterValuesType>('all')


    const removeTask = (taskID: number) => {
        setTasks(tasks.filter(t => t.id !== taskID))
    }

    const changeFilter = (filter: FilterValuesType) => {
            setFilter(filter)
        }





    let tasksForRender = tasks
    if (filter === 'active') {
        tasksForRender = tasks.filter(t => t.isdone === false)
    }
    if (filter === 'completed') {
        tasksForRender = tasks.filter(t => t.isdone === true)
    }
    return (
        <div className="App">
            <ToDoList
                title={"What to learn"}
                tasks={tasksForRender}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />

        </div>
    )
}



export default App;
