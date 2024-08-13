import React from "react";
import { GroceryForm } from "./GroceryForm";

export function GroceryWrapper(){
    return (
        <div className="GroceryWrapper">
            <h1>Add Shopping Items!</h1>
            <GroceryForm />
        </div>
    );
}