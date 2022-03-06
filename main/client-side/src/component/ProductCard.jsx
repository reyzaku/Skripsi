import { SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { convertRupiah } from '../utils/convertRupiah';


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

const Wrapper = styled.div`
    align-self: center;
    flex: 1 1 150px;
    flex: 0 1 150px;
    margin: 4px 4px 40px 4px;
`


const Container = styled.div`
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
const ProductCard = ({item}) => {
    return(
        <Wrapper>
            <Container>
                <Image src={item.image}/>
                <Info>
                    <Tooltip title="Lihat Produk" placement='bottom'>
                    <Link to={`/produk/${item._id}`}>  
                        <Icon>
                            <SearchOutlined/>
                        </Icon>
                    </Link>
                    </Tooltip>
                </Info>
            </Container>

            <Detail>
                <Title>{item.title}</Title>
                <Price>{convertRupiah(item.price)}</Price>
            </Detail>
        </Wrapper>
      
    )
};

export default ProductCard;
