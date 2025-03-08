import React from "react";
import TopNavBar from "../components/TopNavBar";
import TableCreator from "../components/TableCreator";
import RestaurantReservations from "../components/RestaurantReservations";
import OpeningTimes from "../components/OpeningTimes";

function RestaurantDashboard(){



    return (
        <div>
            <TopNavBar/>
            <p>Restaurant Dashboard</p>
            <TableCreator/>
            <p>___________________</p>
            <RestaurantReservations/>
            <p>____________________</p>
            <OpeningTimes/>
        </div>
    )


}

export default RestaurantDashboard;