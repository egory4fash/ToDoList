import React from "react";

type ButtonTypes = {
    callBack: () => void,
    name: string
}

export const Button = (props: ButtonTypes) => {

    const onClickButtonHandler = () => {
        props.callBack()
    }
    return (
        <button onClick ={onClickButtonHandler}>{props.name}</button>
    )
}