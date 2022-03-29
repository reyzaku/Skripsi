import react, { useState } from 'react'
import { Breadcrumb, Button, Table } from 'react-bootstrap'
import ReactPaginate from 'react-paginate'
import styled from 'styled-components'
import Header from '../../Component/Header'
import { GlobalContainer, Title } from '../../PreStyled'
import ProductData from '../../Product_data.json'


const Tdata = styled.td`
    color: ${props => props.status ? "green" : "red"};
    font-weight: 600;
`


const ProductTable = () => {
    const [data, setData] = useState(ProductData.slice(0, 200))
    const [pageNumber, setPageNumber] = useState(0)

    const navigate = () => {

    }

    const productPerPage = 10
    const pageVisited = pageNumber * productPerPage
    const pageCount = Math.ceil(data.length / productPerPage)

    const buttonHandle = (event) => {

    }

    const displayedProduct = data.slice(pageVisited, pageVisited + productPerPage).map(product => {
        return (
            <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.title}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td status={product.inStock}>{product.inStock ? "Tersedia" : "Kosong"}</td>
                <td>
                    <Button variant="primary" className='detail-btn' name='detail' onClick={navigate(`/detail/${product.id}`)}>Detail</Button>
                    <Button variant="warning" className='detail-btn' name='edit' onClick={navigate(`/edit/${product.id}`)}>Edit</Button>
                    <Button variant="danger" className='detail-btn' name='delete' onClick={buttonHandle}>Delete</Button>
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
                <Breadcrumb.Item href="#">Product</Breadcrumb.Item>
                <Breadcrumb.Item active>Daftar Produk</Breadcrumb.Item>
            </Breadcrumb>
            <Title>Daftar Product</Title>
            <Header />
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama Product</th>
                        <th>Harga</th>
                        <th>Kategori</th>
                        <th>Status Stock</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {displayedProduct}
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

export default ProductTable