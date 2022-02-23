import React, { useState, createContext } from "react";

export const OrderContext = createContext();

export const OrderProvider = props => {
    const currentOrder = JSON.parse(localStorage.getItem("currentOrder"))
    const initiateOrder = currentOrder ? currentOrder : null
    const [order, setOrder] = useState(initiateOrder)

    return (
        <OrderContext.Provider value={[order, setOrder]}>
            {props.children}
        </OrderContext.Provider>
    )
}