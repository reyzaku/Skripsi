import React, { useEffect, useState } from 'react'
import { Breadcrumb, Button, Table } from 'react-bootstrap'
import ReactPaginate from 'react-paginate'
import styled from 'styled-components'
import Header from '../../Component/Header'
import { GlobalContainer, Title } from '../../PreStyled'
import OrderData from '../../Order_data.json'
import { userRequest } from '../../reqMethod'
import { convertRupiah } from '../../utils/ConvertRupiah'
import { format } from 'timeago.js'
import { Link } from 'react-router-dom'

const OrderTable = () => {
    const [data, setData] = useState(OrderData.slice(0, 200))
    const [pageNumber, setPageNumber] = useState(0)
    const [restart, setRestart] = useState(false)
    const [search, setSearch] = useState(null)

    const navigate = () => {

    }

    const orderPerPage = 10
    const pageVisited = pageNumber * orderPerPage
    const pageCount = Math.ceil(data.length / orderPerPage)

    const buttonHandle = (event) => {

    }

    useEffect(()=> {
        const getData = async () => {
            if(search) {
                const res = await userRequest.get(`/order/?search=${search}`)
                setData(res.data)
                console.log(res.data)
            } else {
                const res = await userRequest.get('/order')
                setData(res.data)
                console.log(res.data)
            }
            console.log(data)
        }
        getData()
    }, [restart, setRestart])

    const displayedOrder = data.slice(pageVisited, pageVisited + orderPerPage).map((order, index) => {
        return (
            <tr key={order._id}>
                <td>{index + 1}</td>
                <td>{order.invoiceId}</td>
                <td>{convertRupiah(order.gross_amount)}</td>
                <td>{order.status}</td>
                <td>{format(order.createdAt)}</td>
                <td>{format(order.updatedAt)}</td>
                <td>
                    <Button variant="primary" className='detail-btn' name='detail' as={Link} to={`/order/${order.invoiceId}`}>Detail</Button>
                    {order.status === "Pending" ?
                        <Button variant="dark" className='detail-btn' name='detail'>Update Resi</Button> : <></>
                    }
                </td>
            </tr>
        )
    })

    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }

    return (
        <GlobalContainer>
            <Breadcrumb>
                <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="#">Order</Breadcrumb.Item>
                <Breadcrumb.Item active>Daftar List</Breadcrumb.Item>
            </Breadcrumb>
            <Title>Daftar Order</Title>
            <Header />
            <Table striped bordered hover className='table align-middle mb-0 px-1 bg-white'>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Invoice</th>
                        <th>Nominal</th>
                        <th>Status Transaksi</th>
                        <th>Tanggal Transaksi</th>
                        <th>Update Terakhir</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {displayedOrder}
                </tbody>
            </Table>
            <ReactPaginate
                pageCount={pageCount}
                onPageChange={changePage}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                previousLabel="< previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
            />
        </GlobalContainer>
    )
}

export default OrderTable