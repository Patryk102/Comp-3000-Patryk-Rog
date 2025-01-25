import React from "react";
import { useParams } from 'react-router-dom';

function RestaurantPage(){
    const { id } = useParams();


    return (
        <div>
            <p>Restaurant Page {id}</p>
        </div>
    )
}

export default RestaurantPage;