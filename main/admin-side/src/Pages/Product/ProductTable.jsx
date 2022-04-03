import react, { useEffect, useState } from 'react'
import { Breadcrumb, Button, Form, Stack, Table } from 'react-bootstrap'
import ReactPaginate from 'react-paginate'
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import Header from '../../Component/Header'
import { GlobalContainer, Title } from '../../PreStyled'
import ProductData from '../../Product_data.json'
import { publicRequest, userRequest } from '../../reqMethod';
import { convertRupiah } from '../../utils/ConvertRupiah';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import SearchIcon from '@mui/icons-material/Search';

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
`

const FormContainer = styled.div`
    display: flex;
    width: 200px;
`

const Tdata = styled.td`
    color: ${props => props.status ? "green" : "red"};
    font-weight: 600;
`


const ProductTable = () => {
    const [data, setData] = useState(ProductData.slice(0, 200))
    const [pageNumber, setPageNumber] = useState(0)
    const productPerPage = 10
    const pageVisited = pageNumber * productPerPage
    const pageCount = Math.ceil(data?.length / productPerPage)
    const [restart, setRestart] = useState(false)
    const [search, setSearch] = ""

    useEffect(() => {
        const getData = async () => {
            const res = await publicRequest.get('/product')
            setData(res.data)
        }
        getData()
        console.log(data)
    }, [restart, setRestart])

    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }

    const buttonHandle = (event) => {
        let name = event.target.name

        userRequest.delete(`/product/${name}`).then(
            setRestart(!restart)
        )
    }

    const BoolChange = (event) => {
        let name = event.target.name
        let value = event.target.checked
        console.log(name)
        userRequest.put(`/product/${name}`, {
            inStock: value
        }).then(
            setRestart(!restart)
        )
    }

    const SearchHandle = (event) => {
        let value = event.target.value
        setSearch(value)
        setRestart(!restart)
    }

    const GetImage = () => {
        
    }

    

    const displayedProduct = data?.slice(pageVisited, pageVisited + productPerPage).map((product, index) => {
        

        return (
            <tr key={index + 1}>
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
                    <Button variant="primary" className='detail-btn' name='detail' as={Link} to={`/produk/${product._id}`}>Detail</Button>
                    <Button variant="warning" className='detail-btn' name='edit' href={`/produk/edit/${product._id}`}>Edit</Button>
                    <Button variant="danger" className='detail-btn' name={product._id} onClick={buttonHandle}>Delete</Button>
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
            <Wrapper>
                    <Stack direction="horizontal" gap={2}>
                        <Button variant="primary" className="w-100" as={Link} to={`/produk/add`}>Tambah Data</Button>
                    </Stack>
                    <FormContainer>
                        <Form.Control type="text" placeholder="Cari data" name="search" value={search} onChange={SearchHandle}/>
                        <Button variant="dark">
                            <SearchIcon />
                        </Button>
                    </FormContainer>
                </Wrapper>
            <Table striped bordered hover className='table align-middle mb-0 px-1 bg-white'>
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