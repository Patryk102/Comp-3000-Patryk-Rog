import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from "./sidebar";
import '../componentStyles/TopNavBar.css';



function TopNavBar(){
    let currentPage = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    const homepageItems = [
        {label: "home", link: "/"},
        {label: "about", link: ""}
    ];

    var correctItems = [];




    const toggleSideBar = () => {
        setIsOpen(!isOpen);
        console.log(isOpen);
    };

    const navigate = useNavigate();

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
            correctItems = homepageItems;
           
        }
        else {
            removeLoginSpecific();
        }


    }

    const removeLoginSpecific = () => {
        var elements = document.getElementsByClassName("loggedOutSpecific");
            for (let i = 0; i < elements.length; i++){
                elements[i].hidden = true;
            }
    }



    return (
        <nav className="navbar">
            <div onClick={toggleSideBar} className="menu-button">
                    <span></span>
                    <span></span>
                    <span></span>
            </div>
            




            <div className="navbar-left">
                <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

                <h2 style={{margin: 0}}>Table Book</h2>
            </div>
            <div className="navbar-right">
                <div className="loggedOutSpecific">
                    <button className="button-4" onClick={processPressLogin}>Login</button>
                    <button className="button-4" onClick={processPressRegister}>Register</button>
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
        navigate("/userLogin");
    }
    if (action == "register"){
        navigate("/userRegister")
    }

}


export default TopNavBar;