import { Add, Remove } from '@mui/icons-material';
import React from 'react';
import styled from 'styled-components';
import Footer from '../component/Footer';
import Navbar from '../component/Navbar';
import Product1 from "../img/ProductDummy1.jpeg"
import Product2 from "../img/ProductDummy2.jpeg"

const Container = styled.div`

`
const Title = styled.h2`
    font-size: 32px;
    font-weight: 300;
    margin: 20px 70px;
`
const Subtitle = styled.h3`
    font-size: 24px;
    font-weight: 300;
    border-bottom: solid 0.5px lightgray;

`
const Wrapper = styled.div`
    display: flex;
    margin: 50px 70px;
    justify-content: space-between;

`
const ProductContainer = styled.div`
    flex: 2;
    margin-right: 20px;
`
const ProductCard = styled.div`
    display: flex;
    margin: 20px 0px;
`
const Image = styled.img`
    width: 200px;
    height: 200px;
    object-fit: cover;
    object-position: top;
    margin-right: 40px;

`
const Detail = styled.div`
    display: flex;
    flex-direction: column;
`
const ProductTitle = styled.h4`
    font-weight: 300;
    font-size: 20px;
`
const Variant = styled.p``
const Price = styled.h5``
const Counter = styled.div`
    display: flex;
    margin-top: 50px;
`

const AddAmount = styled.button`
    padding: 5px 10px;
    cursor: pointer;
    border: none;
    background-color: black;
    color: white;
    transition: all 0.5s ease;
    &:hover {
        color: white;
        transform: scale(1.05);
        background: #8a2755;
    }
`
const RemoveAmount = styled.button`
    padding: 5px 10px;
    cursor: pointer;
    border: none;
    background-color: black;
    color: white;
    transition: all 0.5s ease;
    &:hover {
        color: white;
        transform: scale(1.05);
        background: #8a2755;
    }
`

const Count = styled.span`
    margin: 0px 10px;
    padding: 5px 15px;
    border: 1px solid lightgray;
    display: flex;
    align-items: center;
    justify-content: center;
`
const SummaryContainer = styled.div`
    flex: 1;
`
const Subtotal = styled.h4`
    margin-top: 20px;
`
const Tax = styled.p``
const Estimated = styled.h3`
    margin-bottom: 50px;
`
const Button = styled.button`
    width: 100%;
    margin: 10px 0px;
    height: 40px;
    border: none;
    background-color: black;
    color: white;
    transition: all 0.5s ease;
    &:hover {
        color: white;
        background: #8a2755;
    }
`


const Cart = () => {
    return (
        <Container>
            <Navbar/>
            <Title>Keranjang Kamu</Title>
            <Wrapper>
                <ProductContainer>
                    <Subtitle>Daftar Produk</Subtitle>
                    <ProductCard>
                        <Image src={Product1}/>
                        <Detail>
                            <ProductTitle>Armany Blue 1</ProductTitle>
                            <Variant>Ukuran : XL</Variant>
                            <Price>Rp. 100.000</Price>
                            <Counter>
                                <RemoveAmount><Remove/></RemoveAmount>
                                <Count>1</Count>
                                <AddAmount><Add/></AddAmount>
                            </Counter>
                        </Detail>
                    </ProductCard>

                    <ProductCard>
                        <Image src={Product2}/>
                        <Detail>
                            <ProductTitle>Armany Blue 1</ProductTitle>
                            <Variant>Ukuran : XL</Variant>
                            <Price>Rp. 100.000</Price>
                            <Counter>
                                <RemoveAmount><Remove/></RemoveAmount>
                                <Count>1</Count>
                                <AddAmount><Add/></AddAmount>
                            </Counter>
                        </Detail>
                    </ProductCard>
                </ProductContainer>
                <SummaryContainer>
                    <Subtitle>Estimasi Harga</Subtitle>
                    <Subtotal>Rp. 340.000</Subtotal>
                    <Tax>Rp. 34.000</Tax>
                    <Estimated>Rp. 364.000</Estimated>
                    <Button>Tambah Product</Button>
                    <Button>Checkout</Button>
                </SummaryContainer>
            </Wrapper>
            <Footer/>
        </Container>
    );

};

export default Cart;
