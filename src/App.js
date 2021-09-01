import './App.css';
import FurnishLogEntry from './Components/FurnishLogEntry';
import ManualLogEntry from './Components/ManualLogEntry';
function App() {
  return (
    <div className="App">
      <h3>Enter your fitness hours</h3>
      <header className="App-header">
      <ManualLogEntry/>
      <FurnishLogEntry/>
      </header>
    </div>
  );
}

export default App;
