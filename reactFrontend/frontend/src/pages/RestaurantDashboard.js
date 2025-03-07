import React from "react";
import TopNavBar from "../components/TopNavBar";
import TableCreator from "../components/TableCreator";
import RestaurantReservations from "../components/RestaurantReservations";

function RestaurantDashboard(){



    return (
        <div>
            <TopNavBar/>
            <p>Restaurant Dashboard</p>
            <TableCreator/>
            <p>___________________</p>
            <RestaurantReservations/>
        </div>
    )


}

export default RestaurantDashboard;