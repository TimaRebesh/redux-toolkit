import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { removeMessage } from "../store/reducers/messagesSlice";

export default function Messages() {

    const messages = useAppSelector(state => state.messages.messages);
    const dispatch = useAppDispatch();

    const remove = (id: number) => {
        dispatch(removeMessage(id))
    }

    const getDate = (time: number) => {
        const addNull = (val: string) => val.length < 2 ? '0' + val : val;
        const year = new Date(time).getFullYear();
        let month = (new Date(time).getMonth() + 1).toString();
        month = addNull(month);
        let day = (new Date(time).getDate()).toString();
        day = addNull(day);
        let hour = (new Date(time).getHours().toString());
        hour = addNull(hour);
        let minute = (new Date(time).getMinutes()).toString();
        minute = addNull(minute);

        return hour + ':' + minute + ' ' + year + '.' + month + '.' + day
    }

    return (
        <div>
            {messages.map(m =>
                <div key={m.id} className='message'>
                    <span className='date'>{getDate(m.id)}</span>
                    <span>{m.text}</span>
                    <span className='remove' onClick={() => remove(m.id)}>&#10005;</span>
                </div>
            )}
        </div>
    )
}
