import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";
type TodolistsType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

function App() {


    let todolistID1 = v1();123123123123
    let todolistID2 = v1();234234234

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });


    function removeTask(id: string, todolistID: string) {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(a => a.id !== id)})
    }


    function addTask(title: string, todolistID: string) {
        // let task = {id: v1(), title: title, isDone: false};
        // let newTasks = [task, ...tasks];
        // setTasks(newTasks);
        setTasks({...tasks, [todolistID]: [{id: v1(), title: title, isDone: false}, ...tasks[todolistID]]})
    }

    function changeStatus(taskId: string, isDone: boolean, todolistID: string) {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(m => m.id === taskId ? {...m, isDone: isDone} : m)})
    }


    function changeFilter(value: FilterValuesType, todolistID: string) {
        setTodolists(todolists.map(m => m.id === todolistID ? {...m, filter: value} : m))
    }


    return (
        <div className="App">
            {todolists.map(m=> {
                let tasksForTodolist = tasks[m.id];

                if (m.filter === "active") {
                    tasksForTodolist = tasks[m.id].filter(t => t.isDone === false);
                }
                if (m.filter === "completed") {
                    tasksForTodolist = tasks[m.id].filter(t => t.isDone === true);
                }
                return (
                    <Todolist
                        key={m.id}
                        todolistID={m.id}
                        title={m.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={m.filter}
                    />
                )
            })}

        </div>
    );
}

export default App;