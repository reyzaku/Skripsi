import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
    flex: 1;
    margin: 4px;
    height: 30vh;
    position: relative;
    cursor: pointer;
`
const Info = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgb(0, 0, 0, 0.8);
`
const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`

const Title = styled.h2`
    color: white;
    margin: 10px;
`
const Button = styled.button`
    color: black;
    background: white;
    border: none;
    padding: 10px 30px;
    transition: all 0.5s ease;
    &:hover {
        color: white;
        background: #8a2755;
    }
`

const CatalogButton = ({item}) => {
    return (
        <Container>
            <Link to={`/katalog/${item.cat}`}>
                <Image src={item.img}/>
                <Info>
                    <Title>{item.title}</Title>
                    <Button>LIHAT KATALOG</Button>
                </Info>
            </Link>
        </Container>
    )
}

export default CatalogButton
