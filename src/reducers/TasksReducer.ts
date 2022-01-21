import { TasksStateType} from "../App";
import {v1} from "uuid";

type GeneralType = UpdateTaskACType | removeTaskACType | addTaskACType | changeStatusACType | newTasksACType
type UpdateTaskACType = ReturnType<typeof updateTaskAC>
type removeTaskACType = ReturnType<typeof removeTaskAC>
type addTaskACType = ReturnType<typeof addTaskAC>
type changeStatusACType = ReturnType<typeof changeStatusAC>
type newTasksACType = ReturnType<typeof newTasksAC>



export const TasksReducer = (state: TasksStateType, action: GeneralType): TasksStateType => {
    switch (action.type) {
        case "UPDATE-TASK" : {
            return {...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(m => m.id === action.payload.id ? {
                    ...m,
                    title: action.payload.localTitle
                } : m)
            }
        }
        case "REMOVE-TASK": {
            let todolistTasks = state[action.payload.todolistId]
            state[action.payload.todolistId] = todolistTasks.filter(t => t.id !== action.payload.id);
            return {...state};
        }
        case "ADD-TASK": {
            let task = {id: v1(), title: action.payload.title, isDone: false};
            let todolistTasks = state[action.payload.todolistId];
            state[action.payload.todolistId] = [task, ...todolistTasks];
            return {...state}
        }
        case "CHANGE-STATUS": {
                let todolistTasks = state[action.payload.todolistId];
            let task = todolistTasks.find(t => t.id === action.payload.id);
            if (task) {
                task.isDone = action.payload.isDone;
                return {...state}
            }
            return state;
        }
        case "NEW-TASKS": {
            return {...state, [action.payload.newID]:[]}
        }
        default:
            return state
    }
}

export const updateTaskAC = (todolistId: string, id: string, localTitle: string) => {
    return {
        type: "UPDATE-TASK",
        payload: {
            todolistId: todolistId,
            id: id,
            localTitle: localTitle
        }
    } as const
}
export const removeTaskAC = (id: string, todolistId: string) => {
    return {
        type: "REMOVE-TASK",
        payload: {
            todolistId: todolistId,
            id: id,
        }
    } as const
}
export const addTaskAC = (title: string, todolistId: string) => {
    return {
        type: "ADD-TASK",
        payload: {
            title:title,
            todolistId: todolistId
        }
    } as const
}
export const changeStatusAC = (id: string, isDone: boolean, todolistId: string) => {
    return {
        type:"CHANGE-STATUS",
        payload: {
            id:id,
            isDone: isDone,
            todolistId:todolistId
        }
    } as const
}
export const newTasksAC = (newID:string) => {
    return {
        type: "NEW-TASKS" as const,
        payload: {
            newID
        }
    } as const
}