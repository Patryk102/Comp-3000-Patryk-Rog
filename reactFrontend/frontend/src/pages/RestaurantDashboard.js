import React from "react";
import TopNavBar from "../components/TopNavBar";
import TableCreator from "../components/TableCreator";
import RestaurantReservations from "../components/RestaurantReservations";
import OpeningTimes from "../components/OpeningTimes";
import DescriptionEditor from "../components/DescriptionEditor";
import ImageEditor from "../components/ImageEditor";

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
                        <p>____________________</p>
                        <ImageEditor/>
                    </div>
                </div>
            </div>
        </div>
    )


}

export default RestaurantDashboard;