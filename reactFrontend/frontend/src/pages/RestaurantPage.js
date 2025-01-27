import React from "react";
import { useParams } from 'react-router-dom';
import TopNavBar from "../components/TopNavBar";
import { apiGetConnection } from "../reusableFunctions/apiConnection";
import { getRestaurantUrl } from "../apiLinks/ApiEndpoints";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";

function RestaurantPage(){
    const { id } = useParams();
    const navigate = useNavigate();
    const [restaurantComponents, setRestaurantComponents] = useState([]);

    useEffect(() => {
        async function getData(){
            const response = await apiGetConnection(getRestaurantUrl(id));
            return response[1];
        }

        async function fetchData(){
            const data = await getData();
            setRestaurantComponents(data);
        } 


        
        fetchData();
    }, []);

    useEffect(() => {
        console.log("printing components");
        console.log(restaurantComponents);
        
    }, [restaurantComponents]);

    const bookTablePressed = () => {
        navigate("/tableBook/" + id);
    }

    
      
    return (
        <div>
            <TopNavBar/>
            <p>Restaurant Page {id}</p>
            <h2>{restaurantComponents.restaurant_name}</h2>
            <h3>Description</h3>
            <text>{restaurantComponents.restaurant_description}</text>
            <br/>
            <button onClick={bookTablePressed}>Book Table</button>
            <br/>
            <h3>Extra details</h3>
            <text>Total tables: {restaurantComponents.total_tables}</text>
        </div>
    )
}

export default RestaurantPage;