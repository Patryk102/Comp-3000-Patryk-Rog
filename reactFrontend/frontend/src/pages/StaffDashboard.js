import React, { useEffect, useState } from "react";
import TopNavBar from "../components/TopNavBar";
import { Link, useNavigate } from "react-router-dom";
import { apiAuthGetConnection } from "../reusableFunctions/apiConnection";
import { getStaffRestaurantsUrl } from "../apiLinks/ApiEndpoints";
import RestaurantPicker from "../components/RestaurantPicker";
import "../pageStyles/RestaurantDashboard.css";


function StaffDashboard(){

    const navigate = useNavigate();
    const [restaurantData, setRestaurantData] = useState([]);
    
    useEffect(() => {
        //api check will go here
        const fetchData = async () => {
            const url = getStaffRestaurantsUrl();
            const token = localStorage.getItem("staffToken");
            const data = await apiAuthGetConnection(url, token);
            //alert(data[0] + data[1].length);
            if (data[1].length > 0) {
                document.getElementById("restaurantPicker").hidden = false;
                document.getElementById("newUser").hidden = true;
                const convertedData = convertData(data[1]);
                setRestaurantData(convertData);
                //alert(convertData[0]);
            }
            else{
                document.getElementById("newUser").hidden = false;
            }
            document.getElementById("loading").hidden = true;

        }

        fetchData();


    }, []);

    const convertData = (data) => {
        let restaurants = [];
        for (let i = 0; i < data.length; i++){
            let restaurantsObject = [];
            Object.keys(data[i]).forEach((key) => {
                console.log(`${key}: ${data[i][key]}`);
                restaurantsObject.push([key, data[i][key]]);
            });
            restaurants.push(restaurantsObject);
        }
        setRestaurantData(restaurants);
        return restaurants;

    }






    return (
        <div>
            <TopNavBar></TopNavBar>
            <div className="restMainDiv">
                <h1>Staff Dashboard</h1>
                <div className="description">
                    <div className="descriptionContents">
                        
                        <div id="loading">Loading please wait</div>
                        <div id="newUser" hidden={true}>
                            <h2>WElCOME NAME SURNAME</h2>
                        
                            <h2>ARE YOU A RESTURANT OWNER</h2>
                        
                            <h2>CLICK BELOW TO REGISTER YOUR RESTAURANT</h2>
                            <Link to="/restaurantregister"><button className="registerRestButton">Register restaurant</button></Link>
                        </div>
                        <div id="restaurantPicker" hidden={true}>
                            <RestaurantPicker restaurantData={restaurantData}/>
                            <Link to="/restaurantregister"><button className="registerRestButton">Register restaurant</button></Link>
                        </div>
                    </div>
                </div>
            </div>
       
        </div>
    )
}

export default StaffDashboard;