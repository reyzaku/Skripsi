import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import styled from 'styled-components';
import ProductList from '../pages/ProductList';
import ProductCard from './ProductCard';

const Container = styled.div`
    margin: 100px 70px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: baseline;
`

const ProductGrid = (cat, sort) => {
    const [product, setProduct] = useState([]);
    const [filterProduct, setFilterProduct] = useState([])
    const urlApi = "http://localhost:5000/api/product"
    useEffect(() =>{
        const getProduct = async () => {
            try {
                const res = await axios.get(
                    urlApi
                )
                setProduct(res.data)
            }catch(err){}
        };
        getProduct();
    }, [cat]);
    console.log(product)
    // useEffect(() => {
    //     if (sort === "newest") {
    //         setFilterProduct((prev) =>
    //             [...prev].sort((a, b) => a.createdAt - b.createdAt)
    //         )
    //     } else if(sort === "asc") {
    //         setFilterProduct((prev) =>
    //             [...prev].sort((a, b) => a.price - b.price)
    //         )
    //     } else {
    //         setFilterProduct((prev) =>
    //             [...prev].sort((a,b) => b.price - a.price)
    //         )
    //     }
    // }, [sort])

    return (
        <Container>
            {product.map((item) => (
                <ProductCard item={item} key={item._id} />
            ))}
        </Container>
    )
}

export default ProductGrid