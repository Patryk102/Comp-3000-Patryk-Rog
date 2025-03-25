import React from "react";
import TopNavBar from "../components/TopNavBar";
import TableCreator from "../components/TableCreator";
import RestaurantReservations from "../components/RestaurantReservations";
import OpeningTimes from "../components/OpeningTimes";
import DescriptionEditor from "../components/DescriptionEditor";

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
                        <p>____________________</p>
                        <DescriptionEditor/>
                    </div>
                </div>
            </div>
        </div>
    )


}

export default RestaurantDashboard;