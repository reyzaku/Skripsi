import React, { useState } from 'react';
import FilterSection from '../component/FilterSection';
import Footer from '../component/Footer';
import Navbar from '../component/Navbar';
import Newsletter from '../component/Newsletter';
import FeaturedProduct from "../component/FeaturedProduct"
import styled from 'styled-components';
import { ArrowDownward, ArrowUpward, SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material';
import { Link, useLocation, useParams } from 'react-router-dom'
import { Tooltip } from '@mui/material';
import { useEffect } from 'react';
import axios from 'axios';
import ProductGrid from '../component/ProductGrid';
import { Row } from 'react-bootstrap';
import ProductCard from '../component/ProductCard';
import { userRequest } from '../reqMethod';
import { connect } from 'react-redux';


const Container = styled.div`
    margin: 100px 70px;

    @media (max-width: 480px) {
        width: 100%;
        margin: 10px auto;
    }
    
`
const Wrapper = styled.div`
    flex: 1;
    margin: 4px 4px 40px 4px;
`

const Info = styled.div`
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5s ease;
    cursor: pointer;
`

const ProductContainer = styled.div`
    min-width: 300px;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: start;
    background-color: white;
    position: relative;

    &:hover ${Info}{
        opacity: 1;
    }
`

const FilterContainer = styled.div`
  margin: 20px 70px;
`

const Filter = styled.div`
    display: flex;
   align-items: center;
`

const FilterText = styled.span`
  font-style: 20px;
  font-weight: 600;
  margin-right: 20px;
`

const FilterSelection = styled.select`
  padding: 10px 20px;
  margin-top: 10px;
  cursor: pointer;
  border-color: lightgray;
  margin-right: 20px;
`

const Option = styled.option`
  padding: 10px 20px;
`

const Image = styled.img`
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: top;
`

const Icon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    transition: all 0.5s ease;

    &:hover{
        background-color: #8a2755;
        transform: scale(1.1);
        color: white;
    }
`

const Detail = styled.div`
    margin-top: 10px;
    text-align: center;
`

const Title = styled.h4`

`

const Price = styled.p`

`

const ProductList = ({products}) => {

    const location = useLocation()
    const { id } = useParams()
    const cat = location.pathname.split("/")[2]
    const [filter, setFilters] = useState({})
    const [sort, setSort] = useState("Baru")

    const [product, setProduct] = useState([])

    const handleFilter = (e) => {
        const value = e.target.value
        setFilters({
            [e.target.name]: value
        })
    }
    let apiUrl = location.pathname === "/katalog" ? `/product` : `/product?category=${cat}`
    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await userRequest.get(
                    apiUrl
                )
                setProduct(res.data)
            } catch (err) { }
        };
        getProduct();
    }, []);

    return (
        <div>
            <Navbar />
            <Container>
                <Row>
                    {product.filter(function(obj){
                        return obj.inStock
                    }).map((item) => (
                        <ProductCard item={item} key={item._id} />
                    ))}
                </Row>
            </Container>


            <Newsletter />
            <Footer />
        </div>

    );
};
export default ProductList;

// {product.map((item) => (
//     <ProductCard item={item} key={item._id} />
// ))}