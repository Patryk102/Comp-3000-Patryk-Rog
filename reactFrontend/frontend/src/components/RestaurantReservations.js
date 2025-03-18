import React from "react";
import { useEffect, useState } from "react";
import { apiAuthGetConnection } from "../reusableFunctions/apiConnection";
import { getRestaurantReservationsUrl } from "../apiLinks/ApiEndpoints";
import { useParams } from 'react-router-dom';
import "../componentStyles/RestaurantReservations.css";


function RestaurantReservations(){
    const [userReservations, setUserReservations] = useState([]);
    const { id } = useParams();
    const today = new Date().toISOString().slice(0, 10);
    const tomorow = new Date(today);
    tomorow.setDate(tomorow.getDate() + 1);
    const testingsomething = tomorow.toISOString().slice(0,10);

    const [futureReservations, setFutureReservations] = useState([]);
    



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

    useEffect(() => {
        
    
       
        /*setFutureReservations(userReservations.filter((reservation) => {
            return reservation[2][1].slice(0, 10) > today; 
        }));*/

        setFutureReservations(userReservations
            .filter((reservation) => reservation[2][1].slice(0, 10) > today) // Filter reservations after today
            .sort((a, b) => new Date(a[2][1]) - new Date(b[2][1])) // Sort reservations by date (ascending)
            .slice(0, 20));
    }, [userReservations]); 
    


    return (
        <div>
            
            <p>Todays reservations:</p>
            {userReservations
            .filter((reservation) => reservation[2][1].slice(0, 10) === today)
            .map((reservation, index) => (
                <p className="reservations">Name: {reservation[5][1]} {reservation[6][1]},  date: {reservation[2][1].slice(0,10)}, time: {reservation[3][1].slice(0,5)}, table: {reservation[1][1]}</p>
            ))}

            <p>Later reservations:</p>
            {futureReservations.map((reservation, index) => (
            <p className="reservations" key={index}>
                Name: {reservation[5][1]} {reservation[6][1]}, date: {reservation[2][1].slice(0, 10)}, time: {reservation[3][1].slice(0,5)}, table: {reservation[1][1]}
            </p>
             ))}


        </div>
    )
}

export default RestaurantReservations;