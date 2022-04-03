import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'
import { GlobalContainer, Title } from '../../PreStyled'
import Header from "../../Component/Header";
import UserData from '../../User_data.json'
import ReactPaginate from "react-paginate";
import './pagination.css'
import { Breadcrumb, Button, Form, Pagination, Stack } from 'react-bootstrap';
import { userRequest } from '../../reqMethod';
import {format} from "timeago.js"
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom'

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
`

const FormContainer = styled.div`
    display: flex;
    width: 200px;
`

const UserTable = () => {
    const [data, setData] = useState(UserData.slice(0, 200))
    const [search, setSearch] = useState(null)
    const [pageNumber, setPageNumber] = useState(0)
    const [restart, setRestart] = useState(false)
    const navigate = () => {

    }
    const userPerPage = 10
    const pageVisited = pageNumber * userPerPage
    const pageCount = Math.ceil(data.length / userPerPage)

    const buttonHandle = async (event) => {
        let id = event.target.value
        userRequest.delete(`/user/${id}`)
        setRestart(!restart)
    }

    useEffect(()=> {
        const getData = async () => {
            if(search) {
                const res = await userRequest.get(`/user/?search=${search}`)
                setData(res.data)
            } else {
                const res = await userRequest.get('/user')
                setData(res.data)
            }
            console.log(data)
        }
        getData()
    }, [restart, setRestart])

    const displayedUser = data.slice(pageVisited, pageVisited + userPerPage).map((user, index) => {
        return (
            <tr key={index + 1}>
                <td>{index + 1}</td>
                <td>{user.fullName}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.notelp}</td>
                <td>{format(user.createdAt)}</td>
                <td>
                    <Button variant="primary" className='detail-btn' name='detail' as={Link} to={`/user/${user._id}`}>Detail</Button>
                    <Button variant="warning" className='detail-btn' name='edit' as={Link} to={`/user/edit/${user._id}`}>Edit</Button>
                    <Button variant="danger" className='detail-btn' name='delete' onClick={buttonHandle} value={user._id}>Delete</Button>
                </td>
            </tr>
        )
    })

    const SearchHandle = (event) => {
        let value = event.target.value
        setSearch(value)
        setRestart(!restart)
    }

    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }

    return (
        <div>
            <GlobalContainer>
                <Breadcrumb>
                    <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="#" active>User</Breadcrumb.Item>
                </Breadcrumb>
                <Title>Daftar User</Title>
                <Wrapper>
                    <Stack direction="horizontal" gap={2}>
                        <Button variant="primary" className="w-100" as={Link} to={`/user/add`}>Tambah Data</Button>
                    </Stack>
                    <FormContainer>
                        <Form.Control type="text" placeholder="Cari data" name="search" value={search} onChange={SearchHandle}/>
                        <Button variant="dark">
                            <SearchIcon />
                        </Button>
                    </FormContainer>
                </Wrapper>
                <Table striped hover className='table align-middle mb-0 px-1 bg-white'>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Created</th>
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