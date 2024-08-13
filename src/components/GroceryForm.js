import React, { useState } from "react";

export function GroceryForm({addItem}){
    const [value, setValue] = useState("");

    const handleSubmit = e => {
        e.preventDefault();

        addItem(value);

        setValue("");
    }

    return (
        <form className="GroceryForm" onSubmit={handleSubmit}>
            <input type="text" className="grocery-input" placeholder="Enter an item"
            value={value} onChange={(e) => setValue(e.target.value)} />
            <button type="submit" className="grocery-btn"> Add Item </button>
        </form>
    );
}