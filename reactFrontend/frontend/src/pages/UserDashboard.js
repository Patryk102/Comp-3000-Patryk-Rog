import React, { useEffect, useState } from "react";
import TopNavBar from "../components/TopNavBar";
import RestaurantCard from "../components/RestaurantCard";
import "../pageStyles/UserDashboard.css";
import { getAllRestaurantsUrl } from "../apiLinks/ApiEndpoints";
import { apiGetConnection } from "../reusableFunctions/apiConnection";
import { Link, useNavigate, useLocation } from 'react-router-dom';

function UserDashboard(){

    const navigate = useNavigate();
    const [restaurantComponents, setRestaurantComponents] = useState([])

    useEffect(() => {
        async function getData(){
            const response = await apiGetConnection(getAllRestaurantsUrl());
            return response[1];
        }

        async function fetchData(){
            const data = await getData();
            setRestaurantComponents(data);
            //console.log("printing components");
            //console.log(restaurantComponents);
        } 


        
        fetchData();
    }, []);

    useEffect(() => {
        console.log("printing components");
        console.log(restaurantComponents);
        
    }, [restaurantComponents]);

    const restaurantPressed = ((index) => {
        const restaurant = restaurantComponents[index];
        console.log(restaurant.restaurant_name);
        navigate("/restaurant/" + restaurant.restaurant_id);
    })


    return (
        <div>
            <TopNavBar></TopNavBar>
            <h1 style={{marginLeft:30, marginBottom:0}}>Select a restaurant:</h1>
            <section className="cardContainer">

                {restaurantComponents.map((data, index) => (
                    <RestaurantCard onClick={() => restaurantPressed(index)} key={index} restaurantName={data.restaurant_name} imageSrc={data.restaurant_image} />
                ))}



               
                
            </section>

        </div>
    )
}

export default UserDashboard;