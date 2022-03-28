import React, { useState } from 'react'
import NavigationBar from '../../Component/NavigationBar'
import Table from 'react-bootstrap/Table'
import { GlobalContainer, Title } from '../../PreStyled'
import Header from "../../Component/Header";
import UserData from '../../User_data.json'
import ReactPaginate from "react-paginate";
import './pagination.css'
import { Breadcrumb, Button, Pagination } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const UserTable = () => {
    const [data, setData] = useState(UserData.slice(0, 200))
    const [pageNumber, setPageNumber] = useState(0)
    const navigate = () => {

    }
    const userPerPage = 10
    const pageVisited = pageNumber * userPerPage
    const pageCount = Math.ceil(data.length / userPerPage)

    const buttonHandle = (event) => {

    }

    const displayedUser = data.slice(pageVisited, pageVisited + userPerPage).map(user => {
        return (
            <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.create_date}</td>
                <td>
                    <Button variant="primary" className='detail-btn' name='detail' onClick={navigate(`/detail/${user.id}`)}>Detail</Button>
                    <Button variant="warning" className='detail-btn' name='edit' onClick={navigate(`/edit/${user.id}`)}>Edit</Button>
                    <Button variant="danger" className='detail-btn' name='delete' onClick={buttonHandle}>Delete</Button>
                </td>
            </tr>
        )
    })

    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }

    return (
        <div>
            <GlobalContainer>
                <Breadcrumb>
                    <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="#">User</Breadcrumb.Item>
                    <Breadcrumb.Item active>Add User</Breadcrumb.Item>
                </Breadcrumb>
                <Title>Daftar User</Title>
                <Header />
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Created At</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedUser}
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
                {/* <Pagination>
                    <Pagination.Prev />
                    <Pagination.Item></Pagination.Item>
                    <Pagination.Next />
                </Pagination> */}
            </GlobalContainer>
        </div>

    )
}

export default UserTable