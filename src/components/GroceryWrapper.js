import React, { useState, useEffect } from "react";
import { GroceryForm } from "./GroceryForm";
import { Grocery } from "./Grocery";
import { EditGroceryForm } from "./EditGroceryForm";

export function GroceryWrapper(){
    const [items, setItems] = useState([]);

    const addItem = item => {
        // Make post request to server
        fetch("/groceries", {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                "name": item,
                "found": false,
                "isEditing": false
            })
        })
        .then(res => res)
        .then(data => initialize())
        .catch(err => console.log(err));
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

    const initialize = () => {
        // Inititalize app with data from server
        fetch("/groceries")
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            setItems(data);
        })
        .catch((err) => console.log(err));
    }

    useEffect(() => {
        // Initialize app upon rendering component
        initialize();
    }, []);

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