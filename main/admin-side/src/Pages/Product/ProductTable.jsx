import react, { useEffect, useState } from 'react'
import { Breadcrumb, Button, Form, Table } from 'react-bootstrap'
import ReactPaginate from 'react-paginate'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import Header from '../../Component/Header'
import { GlobalContainer, Title } from '../../PreStyled'
import ProductData from '../../Product_data.json'
import { publicRequest, userRequest } from '../../reqMethod';
import { convertRupiah } from '../../utils/ConvertRupiah';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'


const Tdata = styled.td`
    color: ${props => props.status ? "green" : "red"};
    font-weight: 600;
`


const ProductTable = () => {
    const [data, setData] = useState(ProductData.slice(0, 200))
    const [product, setProduct] = useState(null)
    const [pageNumber, setPageNumber] = useState(0)
    const navigate = useNavigate()
    const productPerPage = 10
    const pageVisited = pageNumber * productPerPage
    const pageCount = Math.ceil(data?.length / productPerPage)
    const [bool, setBool] = useState(false)

    useEffect(() => {
        const getData = async () => {
            const res = await publicRequest.get('/product')
            setData(res.data)
        }
        getData()
        console.log(data)
    }, [])

    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }

    const buttonHandle = (event) => {

    }
    const BoolChange = (event) => {
        let name = event.target.name
        let value = event.target.checked
        console.log(name)
        userRequest.put(`/product/${name}`, {
            inStock: value
        }).then(
            window.location.reload()
        )
    }

    

    const displayedProduct = data?.slice(pageVisited, pageVisited + productPerPage).map((product, index) => {
        

        return (
            <tr key={product._id}>
                <td>{index + 1}</td>
                <td>{product.title}</td>
                <td>{convertRupiah(product.price)}</td>
                <td>{product.category[0]}</td>
                {/* <td status={product.inStock}>{product.inStock ? "Tersedia" : "Kosong"}</td> */}
                <td>
                    {/* <BootstrapSwitchButton checked={product.inStock}
                        onlabel='Tersedia'
                        offlabel='Kosong'
                        width={100}
                        onChange={BoolChange}
                    /> */}
                    <Form.Check 
                        id="custom-switch"
                        label={product.inStock ? "Tersedia" : "Kosong"}
                        name={product._id}
                        checked={product.inStock}
                        onChange={BoolChange}
                    />
                </td>
                <td>
                    <Button variant="primary" className='detail-btn' name='detail' onClick={buttonHandle}>Detail</Button>
                    <Button variant="warning" className='detail-btn' name='edit' onClick={buttonHandle}>Edit</Button>
                    <Button variant="danger" className='detail-btn' name='delete' onClick={buttonHandle}>Delete</Button>
                </td>
            </tr>
        )
    })

    

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