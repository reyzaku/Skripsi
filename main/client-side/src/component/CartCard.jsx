import { Add, Remove } from '@mui/icons-material';
import React from 'react'
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    margin: 100px 70px;
`

const Image = styled.img`
    width: 200px;
    height: 200px;
    object-fit: cover;
    object-position: top;
    margin-right: 40px;

`

const Title = styled.h4`
    font-weight: 300;
    font-size: 20px;
`

const Detail = styled.div`

`

const Size = styled.p``
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

const Quantity = styled.span`
    margin: 0px 10px;
    padding: 5px 15px;
    border: 1px solid lightgray;
    display: flex;
    align-items: center;
    justify-content: center;
`

const CartCard = ({item}) => {
    return (
        <Container>
            <Image src={item.image}/>
            <Detail>
                <Title>test</Title>
                <Price>Rp. {item.price}</Price>
                <Size>{item.size}</Size>
            </Detail>
        </Container>
    )
}

export default CartCard