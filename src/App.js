// import logo from './logo.svg';
import pig from './assets/sow_pig.svg';
import './App.scss';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={pig} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
