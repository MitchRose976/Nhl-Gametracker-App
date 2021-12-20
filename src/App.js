import './App.css';
import background from './media/arena-background.jpg';

function App() {
  return (
    <div className="App" styles={{backgroundImage:`media/nhl-wallpaper.jpg`}}>
      <img src={background} className="background-image"/>
      
    </div>
  );
}

export default App;
