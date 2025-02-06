import React from "react";
import { useEffect, useState } from "react";
import { apiAuthGetConnection } from "../reusableFunctions/apiConnection";
import { getUserTableBookingsUrl } from "../apiLinks/ApiEndpoints";


function UserReservations(){
    const [userReservations, setUserReservations] = useState([]);


    async function initaliseReservations(){
        const url = getUserTableBookingsUrl();
        const token = localStorage.getItem("userToken");
        console.log("loggging the token to test " + token);
        
        
        const getData = await apiAuthGetConnection(url, token);

        if (getData[0] = "200"){
            alert(getData[1][0].restaurant_name);
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
                <p>reservation Restaurant:{reservation[6][1]},  date: {reservation[2][1]} time:{reservation[3][1]} table:{reservation[1][1]}</p>
            ))}
            


        </div>
    )
}

export default UserReservations;