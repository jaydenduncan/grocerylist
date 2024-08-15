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
        // Make get and put request to server to flip isEditing property
        fetch(`/groceries/${id}`)
        .then(res => res.json())
        .then(item => {
            fetch(`/groceries/${id}`, {
                method: 'put',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({
                    "isEditing": !item.isEditing
                })
            })
            .then(res => res)
            .then(data => initialize())
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    };

    const editName = (name, id) => {
        // Make get and put request to server to change name property
        fetch(`/groceries/${id}`)
        .then(res => res.json())
        .then(item => {
            fetch(`/groceries/${id}`, {
                method: 'put',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({
                    "name": name,
                    "isEditing": !item.isEditing
                })
            })
            .then(res => res)
            .then(data => initialize())
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    };

    const deleteItem = id => {
        setItems(items.filter(item => item.id !== id));

        // Make delete request to server
        fetch(`/groceries/${id}`, {
            method: 'delete'
        })
        .then(res => res)
        .then(data => initialize())
        .catch(err => console.log(err));
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
                    <EditGroceryForm editItem={editName} key={index} item={item} />
                ) : (
                    <Grocery item={item} key={index} toggleFound={toggleFound} 
                    editItem={editItem} deleteItem={deleteItem} />
                )
            ))}
        </div>
    );
}