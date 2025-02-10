import React, { useEffect } from "react";
import TopNavBar from "../components/TopNavBar";
import { Link, useNavigate } from "react-router-dom";
import { apiAuthGetConnection } from "../reusableFunctions/apiConnection";
import { getStaffRestaurantsUrl } from "../apiLinks/ApiEndpoints";
import RestaurantPicker from "../components/RestaurantPicker";


function StaffDashboard(){

    const navigate = useNavigate();
    
    useEffect(() => {
        //api check will go here
        const fetchData = async () => {
            const url = getStaffRestaurantsUrl();
            const token = localStorage.getItem("staffToken");
            const data = await apiAuthGetConnection(url, token);
            alert(data[0] + data[1].length);
            if (data[1].length > 0) {
                document.getElementById("restaurantPicker").hidden = false;
            }
        }

        fetchData();


    }, []);






    return (
        <div>
            <TopNavBar></TopNavBar>
            <p>Staff Dashboard</p>
            <h2>WElCOME NAME SURNAME</h2>
           
            <h2>ARE YOU A RESTURANT OWNER</h2>
        
            <h2>CLICK BELOW TO REGISTER YOUR RESTAURANT</h2>
            <div id="restaurantPicker" hidden={true}>
                <RestaurantPicker/>
            </div>
       
            <Link to="/restaurantregister"><button>Register restaurant</button></Link>
        </div>
    )
}

export default StaffDashboard;