import React, { useState } from "react";

export function EditGroceryForm({editItem, item}){
    const [value, setValue] = useState(item.name);

    const handleSubmit = e => {
        e.preventDefault();

        editItem(value, item.id);

        setValue("");
    }

    return (
        <form className="GroceryForm" onSubmit={handleSubmit}>
            <input type="text" className="grocery-input" placeholder="Update Item"
            value={value} onChange={(e) => setValue(e.target.value)} />
            <button type="submit" className="grocery-btn"> Update Item </button>
        </form>
    );
}