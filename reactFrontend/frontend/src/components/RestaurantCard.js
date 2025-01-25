import React from "react";
import "../componentStyles/restaurantCard.css";

function RestaurantCard({onClick, restaurantName, imageSrc}) {
    return (
        <>
            
            <section onClick={onClick} className = "card">
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