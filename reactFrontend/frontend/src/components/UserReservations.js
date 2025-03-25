import React from "react";
import { useEffect, useState } from "react";
import { apiAuthGetConnection } from "../reusableFunctions/apiConnection";
import { getUserTableBookingsUrl } from "../apiLinks/ApiEndpoints";
import "../componentStyles/RestaurantReservations.css";
import { apiAuthDeleteConnection } from "../reusableFunctions/apiConnection";
import { getReservationDeleteUrl } from "../apiLinks/ApiEndpoints";
import "../componentStyles/RestaurantPicker.css";

function UserReservations(){
    const [userReservations, setUserReservations] = useState([]);


    async function initaliseReservations(){
        const url = getUserTableBookingsUrl();
        const token = localStorage.getItem("userToken");
        console.log("loggging the token to test " + token);
        
        
        const getData = await apiAuthGetConnection(url, token);

        if (getData[0] = "200"){
            //alert(getData[1][0].restaurant_name);
            processReservations(getData[1]);

        }



    }

    const processReservations = (reservations) => {
        let allReservations = []
        for (let i = 0; i < reservations.length; i++){
            let tempArr = [];
            for (let key in reservations[i]) {
                if (reservations[i].hasOwnProperty(key)) {
                    console.log(`${key}: ${reservations[key]}`);
                    tempArr.push([key, reservations[i][key]])
                }
            }
            allReservations.push(tempArr);

              
        }
        setUserReservations(allReservations);

    }

    useEffect(() => {
        initaliseReservations();
    }, []);

    async function deleteReservation(id){
        //alert("deleting " + id);
        const url = getReservationDeleteUrl(id);
        const token = localStorage.getItem("userToken");
        const apiReturn = await apiAuthDeleteConnection(url, token);
        //alert(apiReturn[0]);
        if (apiReturn[0] == "200"){
            alert("Reservation deleted succesfully");

        }
        else{
            alert("sorry something went wrong");
        }
        initaliseReservations();

    }


    return (
        <div id="parentContainerRest">
            <div className="restPickerContainer">
            
            {userReservations.map((reservation, index) => (
                <div>
                    
                    <div className="restContainer1">
                        <p id="restPickerLeftAlign" key={index}>reservation Restaurant:{reservation[6][1]},  date: {reservation[2][1].slice(0,10)} time:{reservation[3][1].slice(0,5)} table:{reservation[7][1]}</p>
                        <button id="restPickerRightAlign" onClick={() => deleteReservation(reservation[0][1])}>Delete</button>
                    </div>
                    
                </div>
            ))}
            </div>


        </div>
    )
}

export default UserReservations;