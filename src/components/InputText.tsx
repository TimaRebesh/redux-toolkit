import { useState } from "react"
import { useAppDispatch } from "../hooks/redux";
import { newMessage } from "../store/reducers/messagesSlice";

export default function InputText() {

	const dispatch = useAppDispatch();
    const [text, setText] = useState('');

    const sendMessage = () => {
        if (text) {
            dispatch(newMessage(text))
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
