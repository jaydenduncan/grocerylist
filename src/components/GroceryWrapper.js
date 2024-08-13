import React, { useState } from "react";
import { GroceryForm } from "./GroceryForm";
import { Grocery } from "./Grocery";
import { v4 as uuidv4 } from "uuid";

uuidv4();

export function GroceryWrapper(){
    const [items, setItems] = useState([]);

    const addItem = item => {
        setItems([...items, {id: uuidv4(), name: item, completed: false, isEditing: false}]);
    }

    return (
        <div className="GroceryWrapper">
            <h1>Add Shopping Items!</h1>
            <GroceryForm addItem={addItem} />
            {items.map((item, index) => (
                <Grocery item={item} key={index} />
            ))}
        </div>
    );
}