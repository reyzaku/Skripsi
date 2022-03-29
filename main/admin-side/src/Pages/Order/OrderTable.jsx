import React, { useState } from 'react'
import { Breadcrumb, Button, Table } from 'react-bootstrap'
import ReactPaginate from 'react-paginate'
import styled from 'styled-components'
import Header from '../../Component/Header'
import { GlobalContainer, Title } from '../../PreStyled'
import OrderData from '../../Order_data.json'

const OrderTable = () => {
    const [data, setData] = useState(OrderData.slice(0, 200))
    const [pageNumber, setPageNumber] = useState(0)

    const navigate = () => {

    }

    const orderPerPage = 10
    const pageVisited = pageNumber * orderPerPage
    const pageCount = Math.ceil(data.length / orderPerPage)

    const buttonHandle = (event) => {

    }

    const displayedOrder = data.slice(pageVisited, pageVisited + orderPerPage).map(order => {
        return (
            <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.invoice_id}</td>
                <td>{order.gross_amount}</td>
                <td>{order.status}</td>
                <td>{order.created_at}</td>
                <td>
                    <Button variant="primary" className='detail-btn' name='detail' onClick={navigate(`/detail/${order.id}`)}>Detail</Button>
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
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Invoice</th>
                        <th>Nominal</th>
                        <th>Status Transaksi</th>
                        <th>Tanggal Transaksi</th>
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