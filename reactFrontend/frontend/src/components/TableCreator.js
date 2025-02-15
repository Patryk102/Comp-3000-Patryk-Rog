import React from "react";

function TableCreator(){




    return (
        <div>
            <p>Table creator component</p>

            <div id="tablesDiv">

                <div id="newAddTableDiv">
                    <div id="newAddTableDivAdd">
                        <button>Add table</button>
                    </div>
                    <div id="newAddTableDivConfirmCancel">
                        <button>confirm</button>
                        <button>cancel</button>
                    </div>

                    

                </div>
            </div>
        </div>
    )
}

export default TableCreator;