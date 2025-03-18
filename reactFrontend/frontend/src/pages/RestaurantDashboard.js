import React from "react";
import TopNavBar from "../components/TopNavBar";
import TableCreator from "../components/TableCreator";
import RestaurantReservations from "../components/RestaurantReservations";
import OpeningTimes from "../components/OpeningTimes";

function RestaurantDashboard(){



    return (
        <div>
            <TopNavBar/>
            
            <div className="restMainDiv">
                <h1>Restaurant Dashboard</h1>
                <div className="description">
                    <div className="descriptionContents">
                        
                        <RestaurantReservations/>
                        <p>___________________</p>
                        
                        <TableCreator/>
                        <p>____________________</p>
                        <OpeningTimes/>
                    </div>
                </div>
            </div>
        </div>
    )


}

export default RestaurantDashboard;