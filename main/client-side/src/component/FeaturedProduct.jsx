import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import styled from 'styled-components'
import { FeaturedProducts } from '../data';
import { publicRequest } from '../reqMethod';
import ProductCard from './ProductCard';

const Wrapper = styled.div`
    margin: auto 60px;
`

const Title = styled.h2`
    margin: 30px 10px 30px 0;;
`

const FeaturedProduct = ({title}) => {
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
        <Wrapper>
            <Container fluid className='mx-auto'>
            <Title>{title.title}</Title>
                <Row>
                    {data.map(item => (
                        <Col>
                            <ProductCard item={item} key={item._id} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </Wrapper>
    )
}

export default FeaturedProduct;
