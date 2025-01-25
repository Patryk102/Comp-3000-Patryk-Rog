import React from "react";
import "../componentStyles/restaurantCard.css";

function RestaurantCard({restaurantName, imageSrc}) {
    return (
        <>
            
            <section className = "card">
                <div className="cardImg">
                    <img className="cardImg" alt={restaurantName} src={imageSrc}/>
                </div>
                <div className="cardDetails">
                    <h3 className="cardTitle">{restaurantName}</h3>
                </div>






            </section>
            
            
            
            
        
        
        
        
        </>
    )
}

export default RestaurantCard;