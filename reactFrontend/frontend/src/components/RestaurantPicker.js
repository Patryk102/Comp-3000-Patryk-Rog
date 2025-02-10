import React from "react";
import { useNavigate } from "react-router-dom";

function RestaurantPicker({restaurantData}){
    const navigate = useNavigate();
    

    function restaurantSelection(id){
        console.log(id);
        navigate("/restaurantDashboard/" + id);

    }


    return (
        <div>
            <p>Restaurant picker component to finish</p>
            {restaurantData.map((restaurant, index) => (
                <div>
                    <label key={index}>restaurant_id {restaurant[0][1][1]} </label>
                    <button onClick={() => restaurantSelection(restaurant[0][1][1])}>select</button>
                </div>
            ))}
        </div>
    )
}

export default RestaurantPicker;