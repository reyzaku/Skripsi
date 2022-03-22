import React from 'react';
import styled from 'styled-components'
import { FeaturedProducts } from '../data';
import ProductCard from './ProductCard';


const Wrapper = styled.div`
    margin: 100px 50px;

    @media (max-width: 480px) {
        margin: 20px auto;
    }
`

const TitleSection = styled.div`
    margin: auto 20px;
    display: flex;
    justify-content: space-between;
    
`

const Title = styled.h2`
    
`

const SeeAll = styled.p`
    text-decoration: underline;
    color: #151542;
`

const Container = styled.div`
    display: flex;
    padding: 20px;
    flex-wrap: wrap;
    justify-content: center;
`

const FeaturedProduct = () => {
    return (
        <Wrapper>
            <TitleSection>
                <Title>Featured Products</Title>
                <SeeAll>See All</SeeAll>
            </TitleSection>
            
            <Container>
                {FeaturedProducts.map(item=>(
                    <ProductCard item={item} key={item.id}/>
                ))}
            </Container>  
        </Wrapper>
    )
}

export default FeaturedProduct;
