import React, {ChangeEvent, KeyboardEvent} from "react";


type propsType= {
    callBack: () => void
    title: string
    setTitle: (title:string) => void
}
export const Input = ({setTitle,title,...props}: propsType) => {

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            props.callBack();
        }
    }

return (
    <input
        value={title}
           onChange={onChangeHandler}
           onKeyPress={onKeyPressHandler}
    />
)
}