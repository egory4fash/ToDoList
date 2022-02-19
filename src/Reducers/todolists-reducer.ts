import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export type GeneralType = removeTodolistACType | addTodolistACType | changeTodolistTitleACType | changeFilterACType

export type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export type addTodolistACType = ReturnType<typeof addTodolistAC>
export type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export type changeFilterACType = ReturnType<typeof changeFilterAC>

export const todolistsReducer = (state: Array<TodolistType>, action: GeneralType):Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            // setTodolists(todolists.filter(tl => tl.id != id));
            // delete tasks[id]; // удаляем св-во из объекта... значением которого являлся массив тасок
            // setTasks({...tasks});
            let newState = [...state]
            return newState.filter(f => f.id !== action.payload.id)
        }
        case 'ADD-TODOLIST': {
            // let newTodolistId = v1();
            // let newTodolist: TodolistType = {id: newTodolistId, title: title, filter: 'all'};
            // setTodolists([newTodolist, ...todolists]);
            // setTasks({
            //     ...tasks,
            //     [newTodolistId]: []
            // })
            let newState = [...state]
            return [...newState, {id:v1(),title:action.payload.title,filter:"all"}]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            // найдём нужный todolist
            // const todolist = todolists.find(tl => tl.id === id);
            // if (todolist) {
            //     // если нашёлся - изменим ему заголовок
            //     todolist.title = title;
            //     setTodolists([...todolists]);
            // }
            let newState = [...state]
            return newState.map(m => m.id === action.payload.id ?{...m, title:action.payload.title} : m)

        }
        case 'CHANGE-TODOLIST-FILTER': {
            // let todolist = todolists.find(tl => tl.id === todolistId);
            // if (todolist) {
            //     todolist.filter = value;
            //     setTodolists([...todolists])
            // }
            let newState = [...state]
            return newState.map(m => m.id === action.payload.todolistId ?{...m, filter:action.payload.value} : m)
        }
        default:
            return state
    }

}

export const removeTodolistAC = (id: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {id}
    } as const
}

export const addTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {title}
    } as const
}
export const changeTodolistTitleAC = (id: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {id,title}
    } as const
}
export const changeFilterAC = (value: FilterValuesType, todolistId: string) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {value,todolistId

        }
    }as const
}

