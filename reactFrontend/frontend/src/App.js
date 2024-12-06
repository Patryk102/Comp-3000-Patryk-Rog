import logo from './logo.svg';
import './App.css';
import Login from "./components/Login";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
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
      <Login></Login>
    </div>
  );
}*/

function App(){
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />}/>





      </Routes>




    </Router>
  )



}



export default App;
