import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../componentStyles/Sidebar.css';

function Sidebar({ isOpen, setIsOpen }) {
    //const [isOpen, setIsOpen] = useState(false);
    const [menuItems, setMenuItems] = useState([]);
    //const [isOpen, setIsOpen] = useState(isOpened)
    let currentPage = useLocation();

    const homepageItems = [
        {label: "home", link: "/"},
        {label: "about", link: ""},
        {label: "staff login", link: "/staffLogin"},
        {label: "Staff Register", link: "/staffRegister"},
        {label: "Your reservations", link: "/userReservations"},
        {label: "Your profile", link: "/editUserProfile"},
        {label: "Staff profile", link: "/editStaffProfile"}
    ];


    var correctItems = [];


    const initialisePage = () => {
        console.log(currentPage.pathname);
        if (currentPage.pathname == "/"){
            setMenuItems(homepageItems);
            
        }
        else{
            setMenuItems(homepageItems);
        }


    }



    useEffect(() => {
        initialisePage();
        return () => {

        };
    }, [currentPage.pathname]);




    const toggleSidebar = () => {
        console.log(isOpen);
        setIsOpen(!isOpen);
    };

    const closeSideBar = () => {
        setIsOpen(false);
    }

    return (
        
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <div onClick={closeSideBar} className="side-button">
                    <span></span>
                    <span></span>
                    <span></span>
            </div>
            <nav className="menu">
                <ul>
                    {menuItems.map((item, index) => (
                        <li key={index}>
                            <Link to={item.link}>{item.label}</Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
