import React from "react";
import { useEffect, useState } from "react";


function AvalibleTablesPicker({data}){


    return (
        <div>
            <p>This is the avalible tables picker</p>
            {data.map(table => 
            <button>{table.table_id}</button>)}

        </div>
    )
}

export default AvalibleTablesPicker;