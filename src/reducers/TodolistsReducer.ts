import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

type GeneralType=changeTodolistTitleType | removeTodolistAC |addTodolistAC | changeFilterAC

type changeTodolistTitleType = ReturnType<typeof changeTodolistTitleAC>
type removeTodolistAC = ReturnType<typeof removeTodolistAC>
type addTodolistAC = ReturnType<typeof addTodolistAC>
type changeFilterAC = ReturnType<typeof changeFilterAC>

export const TodolistsReducer = (state:Array<TodolistType>,action:GeneralType) => {
    switch (action.type) {
        case "CHANGE-TODOLIST-TITLE":{
            return state.map(m => m.id === action.payload.todolistID ? {...m,title : action.payload.newTitle} : {...m})
        }
        case "REMOVE-TODOLIST": {
            return state.filter(tl => tl.id !== action.payload.id)
        }
        case "ADD-TODOLIST": {
            let newID = v1()
            let newTodo: TodolistType = {id: newID, title: action.payload.title, filter: "all"};
            return [newTodo, ...state]
        }
        case "CHANGE-FILTER": {
            let todolist = state.find(s => s.id === action.payload.todolistId);
            if (todolist) {
                todolist.filter = action.payload.value;
                return [...state]
            }
        }

        default: return state
    }
}

export const changeTodolistTitleAC = (todolistID:string,newTitle:string) => {
    return {
    type: "CHANGE-TODOLIST-TITLE",
    payload: {
        todolistID:todolistID,
        newTitle:newTitle
    }
    } as const
}
export const removeTodolistAC = (id:string) => {
    return {
        type:"REMOVE-TODOLIST",
        payload: {
            id:id
        }
    } as const
}
export const addTodolistAC = (title:string) => {
    return {
        type:"ADD-TODOLIST",
        payload: {
            title:title
        }
    } as const
}
export  const changeFilterAC = (value: FilterValuesType, todolistId: string) => {
    return {
        type:"CHANGE-FILTER",
        payload: {
            value:value,
            todolistId:todolistId
        }
    } as const
}