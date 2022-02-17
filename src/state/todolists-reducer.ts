import {TodolistType} from "../App";
import {v1} from "uuid";

type GeneralType = RemoveTodolistACType | AddTodolistACType |  ChangeTodolistTitleACType
type RemoveTodolistACType = ReturnType<typeof RemoveTodolistAC>
type AddTodolistACType = ReturnType<typeof AddTodolistAC>
type ChangeTodolistTitleACType = ReturnType<typeof ChangeTodolistTitleAC>

export const todolistsReducer = (state: Array<TodolistType>, action: GeneralType) => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            // setTodolists(todolists.filter(tl => tl.id != id));
            // delete tasks[id];
            // setTasks({...tasks});
            let newState = [...state]
            return newState.filter(t => t.id !== action.payload.id);
        }
        case "ADD-TODOLIST": {
             //let newTodolistId = v1();
             let newTodolist = {id: v1(), title:action.payload.title, filter: 'all'};
            // setTodolists([newTodolist, ...todolists]);
            // setTasks({
            //     ...tasks,
            //     [newTodolistId]: []
            // })

            return [...state,newTodolist]
        }
        case "CHANGE-TODOLIST-TITLE": {
            // const todolist = todolists.find(tl => tl.id === id);
            // if (todolist) {
            //     // если нашёлся - изменим ему заголовок
            //     todolist.title = title;
            //     setTodolists([...todolists]);
            // }
            let newState = [...state]
            return newState.map((m) => m.id === action.payload.id ? {...m,title:action.payload.title} :
                {...m})
        }
        default:
            return state
    }
}

export const RemoveTodolistAC = (id: string) => {
    return {
        type: "REMOVE-TODOLIST",
        payload: {id}
    } as const
}
export const AddTodolistAC = (title:string) => {
    return {
        type: "ADD-TODOLIST",
        payload:{title}
    } as const
}
export const ChangeTodolistTitleAC = (id: string, title: string) => {
    return {
        type:"CHANGE-TODOLIST-TITLE",
        payload:{id,title}
    } as const
}