import React from "react";
import { useNavigate } from "react-router-dom";
import "../componentStyles/RestaurantPicker.css";

function RestaurantPicker({restaurantData}){
    const navigate = useNavigate();
    

    function restaurantSelection(id){
        console.log(id);
        navigate("/restaurantDashboard/" + id);

    }


    return (
        <div id="parentContainerRest">
            <p>Please select a restaurant:</p>
            <div className="restPickerContainer">
                {restaurantData.map((restaurant, index) => (
                    <div className="restPickerContainer1">
                        <label id="restPickerLeftAlign" key={index}>{restaurant[4][1][1]} </label>
                        <button id="restPickerRightAlign" onClick={() => restaurantSelection(restaurant[0][1][1])}>select</button>
                        <br></br>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RestaurantPicker;