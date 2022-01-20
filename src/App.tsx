import React, {useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import Input from "./Components/Input";
import {
    addTodolistAC,
    changeFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    TodolistsReducer
} from "./reducers/TodolistsReducer";
import {TasksReducer, updateTaskAC, removeTaskAC, addTaskAC, changeStatusAC, newTasksAC} from "./reducers/TasksReducer";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function App() {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, todolistsDispatch] = useReducer(TodolistsReducer, [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ])

    let [tasks, tasksDispatch] = useReducer(TasksReducer, {
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: true},

        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Vodka", isDone: true},
            {id: v1(), title: "beer", isDone: true},
        ]
    });

    const updateTask = (todolistId: string, id: string, localTitle: string) => {
        tasksDispatch(updateTaskAC(todolistId, id, localTitle))
    }

    function removeTask(id: string, todolistId: string) {
        tasksDispatch(removeTaskAC(id, todolistId))
    }

    const addTodolist = (title: string) => {
        let newID = v1()

        todolistsDispatch(addTodolistAC(title, newID))
        // setTasks({...tasks, [newID]: []})
        tasksDispatch(newTasksAC(title,newID))
    }

    function addTask(title: string, todolistId: string) {
        tasksDispatch(addTaskAC(title, todolistId))
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        tasksDispatch(changeStatusAC(id, isDone, todolistId))
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        todolistsDispatch(changeFilterAC(value, todolistId))
    }

    function removeTodolist(id: string) {
        todolistsDispatch(removeTodolistAC(id))
        delete tasks[id]
    }

    function changeTodolistTitle(todolistID: string, newTitle: string) {
        todolistsDispatch(changeTodolistTitleAC(todolistID, newTitle))
    }

    return (

        <div className="App">
            <Input callback={(title) => addTodolist(title)}/>
            {todolists.map(tl => {
                let allTodolistTasks = tasks[tl.id];
                let tasksForTodolist = allTodolistTasks;

                if (tl.filter === "active") {
                    tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
                }
                if (tl.filter === "completed") {
                    tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
                }


                return <Todolist
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeStatus}
                    filter={tl.filter}
                    removeTodolist={removeTodolist}
                    updateTask={updateTask}
                    changeTodolistTitle={changeTodolistTitle}
                />
            })
            }

        </div>
    );
}

export default App;
