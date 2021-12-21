import React from 'react';
import {TaskType} from "../Todolist";

export const TesksReducer = (state:Array<TaskType>,action:AllType) => {
switch (action.type){
    case "REMOVE-TASK" :{
        return state
    }
    default:return state
}
};


type AllType = removeTaskACType |removeTaskACType
type removeTaskACType=ReturnType<typeof removeTaskAC>

export const removeTaskAC=(id:string) => {
    return {
        type:"REMOVE-TASK",
        id:id
    } as const


}