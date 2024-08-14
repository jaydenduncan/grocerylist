import React, { useState } from "react";
import { GroceryForm } from "./GroceryForm";
import { Grocery } from "./Grocery";
import { v4 as uuidv4 } from "uuid";
import { EditGroceryForm } from "./EditGroceryForm";

uuidv4();

export function GroceryWrapper(){
    const [items, setItems] = useState([]);

    const addItem = item => {
        setItems([...items, {id: uuidv4(), name: item, found: false, isEditing: false}]);
    };

    const toggleFound = id => {
        setItems(items.map(item => item.id === id ? 
            {...item, found: !item.found} : item
        ));
    };

    const editItem = id => {
        setItems(items.map(item => item.id === id ?
            {...item, isEditing: !item.isEditing} : item
        ));
    };

    const editName = (name, id) => {
        setItems(items.map(item => item.id === id ?
            {...item, name, isEditing: !item.isEditing} : item
        ));
    };

    const deleteItem = id => {
        setItems(items.filter(item => item.id !== id));
    }

    return (
        <div className="GroceryWrapper">
            <h1>Add Shopping Items!</h1>
            <GroceryForm addItem={addItem} />
            {items.map((item, index) => (
                item.isEditing ? (
                    <EditGroceryForm editItem={editName} item={item} />
                ) : (
                    <Grocery item={item} key={index} toggleFound={toggleFound} 
                    editItem={editItem} deleteItem={deleteItem} />
                )
            ))}
        </div>
    );
}