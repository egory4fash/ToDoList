import React, {ChangeEvent} from 'react';
import {TaskType} from "./Todolist";

type MapperTasksType = {
    tasks:Array<TaskType>
    removeTask:(taskId: string,todolistID: string) => void
    todolistID:string
    changeTaskStatus: (taskId: string, isDone: boolean,todolistID: string) => void

}

export const Mapper = ({tasks,removeTask,todolistID,changeTaskStatus,...props}:MapperTasksType) => {

    return (
        <div>
            <ul>
                {
                    tasks.map(t => {
                        const onClickHandler = () => removeTask(t.id,todolistID)
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            changeTaskStatus(t.id, e.currentTarget.checked,todolistID);
                        }

                        return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                            <input type="checkbox"
                                   onChange={onChangeHandler}
                                   checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={onClickHandler}>x</button>
                        </li>
                    })
                }
            </ul>
        </div>
    );
};

