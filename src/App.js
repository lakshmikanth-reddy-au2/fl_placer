import logo from './logo.svg';
import './App.css';
import Routing from './Components/Routing';

function App() {
  return (
    <div className="App">
      <h1>Employee Details</h1>
      <div style={{maxWidth: "800px"}} className="content">
        <Routing />
      </div>
      
    </div>
  );
}

export default App;
