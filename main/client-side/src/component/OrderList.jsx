import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { userRequest } from '../reqMethod';
import OrderCard from './OrderCard'

const OrderList = () => {
    const user = useSelector(state => state.user.currentUser)
    const [invoice, setInvoice] = useState([])

    useEffect(() => {
        const getInvoice = async () => {
            const res = await userRequest.get(`/order?user=${user._id}`)
            setInvoice(res.data)
            console.log(res.data)
        }
        getInvoice()
    }, [])

    return (
        <div>
            {invoice.map((item)=> (
                <OrderCard item={item} key={item._id} />
            ))}
        </div>
    )
}

export default OrderList