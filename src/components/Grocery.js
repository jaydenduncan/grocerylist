import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export function Grocery({item, toggleFound, editItem, deleteItem}){
    return (
        <div className="Grocery">
            <p onClick={() => toggleFound(item.id)} className={`${item.found ? 'found' : ""}`}> {item.name} </p>
            <div>
                <FontAwesomeIcon icon={faPenToSquare} onClick={() => editItem(item.id)}/>
                <FontAwesomeIcon icon={faTrash} onClick={() => deleteItem(item.id)}/>
            </div>
        </div>
    );
}