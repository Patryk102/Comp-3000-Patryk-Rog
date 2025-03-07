import React from "react";
import { useEffect, useState } from "react";
import { apiAuthGetConnection } from "../reusableFunctions/apiConnection";
import { getRestaurantReservationsUrl } from "../apiLinks/ApiEndpoints";
import { useParams } from 'react-router-dom';


function RestaurantReservations(){
    const [userReservations, setUserReservations] = useState([]);
    const { id } = useParams();

    async function initaliseReservations(){
        const url = getRestaurantReservationsUrl(id);
        const token = localStorage.getItem("staffToken");
        //console.log("loggging the token to test " + token);
        
        
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


    return (
        <div>
            
            <p>user reservations component</p>
            {userReservations.map((reservation, index) => (
                <p>Name:{reservation[5][1]} {reservation[6][1]},  date: {reservation[2][1].slice(0,10)} time:{reservation[3][1]} table:{reservation[1][1]}</p>
            ))}
            


        </div>
    )
}

export default RestaurantReservations;