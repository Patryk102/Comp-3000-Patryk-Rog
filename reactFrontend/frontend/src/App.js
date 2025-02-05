import logo from './logo.svg';
import './App.css';
import Login from "./components/Login";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import RegisterPage from './pages/RegisterPage';
import UserDashboard from './pages/UserDashboard';
import StaffLoginPage from './pages/StaffLoginPage';
import StaffDashboard from './pages/StaffDashboard';
import UserRegisterPage from './pages/UserRegisterPage';
import RestaurantPage from './pages/RestaurantPage';
import TableBookPage from './pages/TableBookPage';
import UserReservationsPage from './pages/UserReservationsPage';


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
        <Route path='/' element={<HomePage />}/>
        <Route path='/userLogin' element={<LoginPage />}/>
        <Route path='/staffRegister' element={<RegisterPage />}/>
        <Route path='/userDashboard' element={<UserDashboard />}/>
        <Route path='/staffDashboard' element={<StaffDashboard />}/>
        <Route path='/staffLogin' element={<StaffLoginPage />}/>
        <Route path='/userRegister' element={<UserRegisterPage />}/>
        <Route path='/restaurant/:id' element={<RestaurantPage />}/>
        <Route path='/tableBook/:id' element={<TableBookPage />}/>
        <Route path='/userReservations' element={<UserReservationsPage/>}/>




      </Routes>




    </Router>
  )



}



export default App;
