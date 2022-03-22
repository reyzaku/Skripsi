import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { convertRupiah } from '../utils/convertRupiah'

const Container = styled.div`
    display: flex;
    margin: 50px 70px;
    border: solid 1px lightgray;
    padding: 20px;
`

const Title = styled.h4`
    font-weight: 600;
    font-size: 1.5em;
    margin-bottom: 50px;
`

const SubTitle = styled.p``
const SubContainer = styled.div`
    margin-bottom: 10px;
`

const Image = styled.img`
    width: 200px;
    height: 200px;
    background-color: lightgray;
    margin-right: 20px;
`

const Detail = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

const Price = styled.h5`
    font-size: 1em;
`
const Status = styled.h4`
    font-size: 1em;
    color: ${props => props.status === "pending" ? "red" : "green"};
`

const Button = styled.button`
    width: 10em;
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

    @media (max-width: 480px) {
        width: 200px;
    }
`

const OrderCard = ({item}) => {
    const navigate = useNavigate()
    const ClickHandle = () => {
        navigate(`/order/${item.invoiceId}`)
    }
    return (
        <Container>
            {/* <Image/> */}
            <Detail>
                <Title>{item.invoiceId}</Title>
                <SubContainer>
                    <SubTitle>Total Harga Pesanan</SubTitle>
                    <Price>{convertRupiah(item.gross_amount)}</Price>
                </SubContainer>
                <SubContainer>
                    <SubTitle>Status :</SubTitle>
                    <Status status={item.status}>{item.status}</Status>
                </SubContainer>
                <Button onClick={ClickHandle}>Lihat Detail</Button>
            </Detail>
        </Container>
    )
}

export default OrderCard