import React from "react";
import TopNavBar from "../components/TopNavBar";
import UserReservations from "../components/UserReservations";
import "../pageStyles/LoginRegisterStyle.css";

function UserReservationsPage(){


    return (
        <div>
            <TopNavBar></TopNavBar>
            <div className='restMainDiv'>
                <h1>Your reservations</h1>
                <div className='description'>
                    <div className='descriptionContents'>
                        <UserReservations/>
                    </div>
                </div>
            </div>

            

          
            
        </div>
    )

}

export default UserReservationsPage;