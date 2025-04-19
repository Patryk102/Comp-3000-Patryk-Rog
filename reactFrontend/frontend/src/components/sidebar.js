import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../componentStyles/Sidebar.css';
import { useParams } from 'react-router-dom';

function Sidebar({ isOpen, setIsOpen }) {
    //const [isOpen, setIsOpen] = useState(false);
    const [menuItems, setMenuItems] = useState([]);
    //const [isOpen, setIsOpen] = useState(isOpened)
    let currentPage = useLocation();
    const { id } = useParams();

    const oldhomepageItems = [
        {label: "home", link: "/"},
        {label: "about", link: ""},
        {label: "staff login", link: "/staffLogin"},
        {label: "Staff Register", link: "/staffRegister"},
        {label: "Your reservations", link: "/userReservations"},
        {label: "Your profile", link: "/editUserProfile"},
        {label: "Staff profile", link: "/editStaffProfile"}
    ];

    const homepageItems = [
        {label: "home", link: "/"},
        {label: "staff login", link: "/staffLogin"},
        {label: "Staff Register", link: "/staffRegister"},
    ]

    const userItems = [
        {label: "home", link: "/userDashboard"},
        {label: "Your reservations", link: "/userReservations"},
        {label: "Your profile", link: "/editUserProfile"},
        {label: "Logout", link: "/"}
    ];

    const staffItems = [
        {label: "home", link: "/staffDashboard"},
        {label: "Your profile", link: "/editStaffProfile"},
        {label: "Register restaurant", link:"/restaurantregister"},
        {label: "Logout", link: "/"}
    ]

    var correctItems = [];


    const initialisePage = () => {
        console.log(currentPage.pathname);
        if (currentPage.pathname == "/"){
            setMenuItems(homepageItems);
            
        }
        else if (currentPage.pathname == "/userDashboard" || currentPage.pathname == "/userReservations" || currentPage.pathname == "/editUserProfile" || currentPage.pathname == "/restaurant/" + id || currentPage.pathname == "/tableBook/" + id){
            setMenuItems(userItems)
        }
        else if (currentPage.pathname == "/staffDashboard"|| currentPage.pathname == "/editStaffProfile" || currentPage.pathname == "/restaurantregister" || currentPage.pathname == "/restaurantDashboard/" + id){
            setMenuItems(staffItems);
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
                <div style={{marginTop: 10}}>
                    {menuItems.map((item, index) => (
                        <div key={index}>
                            
                            <Link to={item.link}><button style={{width: "90%", marginLeft: "5%", marginTop: 5}} className="registerRestButton">{item.label}</button></Link>
                        </div>
                    ))}
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
