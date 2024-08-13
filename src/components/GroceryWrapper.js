import React from "react";
import { GroceryForm } from "./GroceryForm";
import { Grocery } from "./Grocery";

export function GroceryWrapper(){
    return (
        <div className="GroceryWrapper">
            <h1>Add Shopping Items!</h1>
            <GroceryForm />
            <Grocery item="Cheese" />
        </div>
    );
}