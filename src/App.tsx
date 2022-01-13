import './App.css';
import InputText from './components/InputText';
import Messages from './components/Messages';
import TabBar from './components/TabBar';
import { useAppSelector } from './hooks/redux';

function App() {

  const tabNumber = useAppSelector(state => state.tabbar.tabNumber)

  const getContent = () => {
    if (tabNumber === 1)
      return null
    if (tabNumber === 2)
      return <Messages />
  }

  return (
    <div className="App">
      <TabBar />
      {getContent()}
    </div>
  );
}

export default App;
