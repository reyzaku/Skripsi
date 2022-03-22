import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import OrderCard from './OrderCard'

const OrderList = () => {
    const user = useSelector(state => state.user.currentUser)
    const [invoice, setInvoice] = useState([])
    const apiUrl = `http://localhost:5000/api/order/find?userId=${user._id}`

    useEffect(() => {
        const getInvoice = async () => {
            const res = await axios.get(apiUrl)
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