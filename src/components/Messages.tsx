import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { deleteMessage, fetchMessages } from "../store/reducers/messagesSlice";

export default function Messages() {

    const  { messages, status, error } = useAppSelector(state => state.messages);
    const dispatch = useAppDispatch();

    useEffect(() => {
       dispatch(fetchMessages());
    }, [])

    const remove = (id: number) => {
        dispatch(deleteMessage(id))
    }

    return (
        <div>
            {status === 'loading' &&
                <h3>Loading...</h3>
            }
            {error &&
                <h3>{error}</h3>
            }
            {messages.length > 0 && messages.map(m =>
                <div key={m.id} className='message'>
                    <span>{m.body}</span>
                    <span className='remove' onClick={() => remove(m.id)}>&#10005;</span>
                </div>
            )}
        </div>
    )
}
