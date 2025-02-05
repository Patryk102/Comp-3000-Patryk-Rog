import React from "react";
import TopNavBar from "../components/TopNavBar";
import UserReservations from "../components/UserReservations";

function UserReservationsPage(){


    return (
        <div>
            <TopNavBar/>
            <p>this is the user reservation page</p>
            <UserReservations/>
        </div>
    )

}

export default UserReservationsPage;