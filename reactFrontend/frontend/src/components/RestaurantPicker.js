import React from "react";
import { useNavigate } from "react-router-dom";
import "../componentStyles/RestaurantPicker.css";
import { getDeleteRestaurantUrl } from "../apiLinks/ApiEndpoints";
import { apiAuthDeleteConnection } from "../reusableFunctions/apiConnection";

function RestaurantPicker({restaurantData}){
    const navigate = useNavigate();
    

    function restaurantSelection(id){
        console.log(id);
        navigate("/restaurantDashboard/" + id);

    }

    async function deleteRestaurant(id){
        const promptResult = window.confirm("Are you sure you want to delete this restaurant?");
        const token = localStorage.getItem("staffToken");
        if (promptResult){
            const apiResult = await apiAuthDeleteConnection(getDeleteRestaurantUrl(id), token);
            if (apiResult[0] == "200"){
                alert("Restaurant succesfully deleted");
                window.location.reload(true);

            }
            else{
                alert("Sorry something went wrong, please try again later");
            }


        }
    }


    return (
        <div id="parentContainerRest">
            <p>Please select a restaurant:</p>
            <div className="restPickerContainer">
                {restaurantData.map((restaurant, index) => (
                    <div className="restPickerContainer1">
                        <label id="restPickerLeftAlign" key={index}>{restaurant[4][1][1]} </label>
                        <button id="restPickerRightAlign" onClick={() => restaurantSelection(restaurant[0][1][1])}>select</button>
                        <button id="restPickerRightAlign" onClick={() => deleteRestaurant(restaurant[0][1][1])}>Delete</button>
                        <br></br>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RestaurantPicker;