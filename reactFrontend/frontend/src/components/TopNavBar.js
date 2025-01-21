import React, { useEffect } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../componentStyles/TopNavBar.css';



function TopNavBar(){
    let currentPage = useLocation();

    const navigate = useNavigate()

    const processPressLogin = () => {
        processLoginRegister("login", navigate);
    }

    const processPressRegister = () => {
        processLoginRegister("register", navigate);
    }

    useEffect(() => {
        initialisePage();
        return () => {

        };
    }, []);




    const initialisePage = () => {
        console.log(currentPage.pathname);
        if (currentPage.pathname == "/"){
            var elements = document.getElementsByClassName("loggedOutSpecific");
            for (let i = 0; i < elements.length; i++){
                elements[i].hidden = true;
            }
        }
    }

    const checkPage = () => {

    }






    return (
        <nav className="navbar">
            <div className="menu-button">
                    <span></span>
                    <span></span>
                    <span></span>
            </div>
            <nav className="menu">

            </nav>




            <div className="navbar-left">
                

                <a>Restaurant Booking System</a>
            </div>
            <div className="navbar-right">
                <div className="loggedOutSpecific">
                    <button className="button-4" onClick={processPressLogin}>Login</button>
                    <button className="button-4" onClick={processPressRegister}>Register</button>
                    <button className="button-4" onClick={initialisePage}>Init</button>
                </div>
            </div>










        </nav>




    )

/*return (
        <div>
            <button onClick={processPressLogin}>Login</button>
            <button onClick={processPressRegister}>Register</button>
            <button>TO FINISH Staff Login</button>


        </div>




    )*/



}

function processLoginRegister(action, navigate){
    if (action == "login"){
        navigate("/stafflogin");
    }
    if (action == "register"){
        navigate("/staffRegister")
    }

}


export default TopNavBar;