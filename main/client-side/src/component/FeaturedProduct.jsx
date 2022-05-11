import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import styled from 'styled-components'
import { FeaturedProducts } from '../data';
import { publicRequest } from '../reqMethod';
import ProductCard from './ProductCard';

const FeaturedProduct = () => {
    const [data, setData] = useState(FeaturedProducts)
    const [restart, setRestart] = useState(false)


    useEffect(() => {
        const getData = async () => {
            const res = await publicRequest.get(`/product`)
            setData(res.data)
            console.log(data)
        }
        getData()
    }, [restart, setRestart])
    return (
        <Container fluid>
            <Row>
                {data.map(item => (
                    <Col>
                        <ProductCard item={item} key={item._id} />
                    </Col>
                ))}
            </Row>
        </Container>
    )
}

export default FeaturedProduct;
