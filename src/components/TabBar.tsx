import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { changeTab } from '../store/reducers/tabBarSlice';

export default function TabBar() {

    const  { tabNumber } = useAppSelector(state => state.tabbar);
    const dispatch = useAppDispatch();
    
    const tabs = [
        { id: 1, text: 'Comments' },
        { id: 2, text: 'ToDo' },
    ]

    return (
        <div className='tab-bar'>
            {tabs.map(t => (
                <div
                    key={t.id}
                    className={`tab ${t.id === tabNumber ? 'selected' : ''}`}
                    onClick={() => dispatch(changeTab(t.id))}
                >
                    <div className='tab-content'>{t.text}</div>
                </div>
            ))}
        </div>
    )
}
