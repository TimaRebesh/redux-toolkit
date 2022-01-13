import { AsyncThunkAction } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { useState } from "react"
import { useAppDispatch } from "../hooks/redux";

interface InputTextProps {
    action: (v: string) => AsyncThunkAction<void, string, {}>
}

export default function InputText(props : InputTextProps) {

	const dispatch = useAppDispatch();
    const [text, setText] = useState('');

    const sendMessage = () => {
        if (text) {
            dispatch(props.action(text))
            setText('');
        }
    }

    return (
        <div>
            <input
                type='text'
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder='enter your text'
            />
            <button onClick={sendMessage} >Add your message</button>
        </div>
    )
}
