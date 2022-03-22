import axios, { Axios } from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Footer from '../component/Footer';
import Navbar from '../component/Navbar';
import { cartLogout } from '../redux/cartRedux';

const Container = styled.div``
const Wrapper = styled.div`
    margin: 50px 70px;
    @media (max-width: 480px) {
        margin: 10px auto;
    }
`
const CrumbContainer = styled.div`
    display: flex;
    align-content: center;
    justify-content: center;
    border-bottom: solid 0.5px lightgray;
    margin-bottom: 50px;

    @media (max-width: 480px) {
        display: none;
    }
`
const Crumb = styled.div`
    text-align: center;
    margin: 40px;
`
const Number = styled.h2`
    text-align: center;
    font-size: 32px;
    font-weight: 300;
    margin: 0px auto;
    width: 50px;
    border-radius: 50%;
    background-color: ${props => props.active === "true" ? "black" : "lightgray"};
    color: white;
    margin-bottom: 20px;
`
const CrumbTitle = styled.h2`
    font-weight: 300;
    font-size: 24px;
    color: ${props => props.active === "true" ? "black" : "lightgray"};
`

const CheckoutContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    @media (max-width: 480px) {
        flex-direction: column-reverse;
    }
`
const Form = styled.form`
    flex: 2;
    margin-right: 100px;
`

const InputTitle = styled.p`
    margin-top: 20px;
`

const Input = styled.input`
    width: 100%;
    margin: 10px 0px;
    height: 40px;
    padding-left: 10px;
`

const SummaryContainer = styled.div`
    flex: 1;
    margin-left: 20px;
    @media (max-width: 480px) {
        margin: 10px 10px;
    }
`
const TextContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
`

const Subtotal = styled.h4`
    margin-top: 20px;
`
const Tax = styled.p``
const Estimated = styled.h3`
    margin-bottom: 50px;
`
const Subtitle = styled.h3`
    font-size: 24px;
    font-weight: 300;
    border-bottom: solid 0.5px lightgray;
    margin-bottom: 20px;
`

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
`

const Button = styled.button`
    width: 100%;
    margin-right: 10px;
    margin-top: 50px;
    height: 40px;
    border: solid 0.5px black;
    background-color: ${props => props.type === "thin" ? "white" : "black"};
    color: ${props => props.type === "thin" ? "black" : "white"};
    transition: all 0.5s ease;
    &:hover {
        color: white;
        background: #8a2755;
    }
`


const CheckoutTwo = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.currentUser)
    const [order, setOrder] = useState({})


    useEffect(() => {
        const getOrder = async () => {
            try{
                const res = await axios.get(`http://localhost:5000/api/order/find/${id}`)
                setOrder(res.data)
                console.log(res.data)
            }catch(err){
                console.log("gagal")
            }
        }
        getOrder()
    }, [])

    const startPayment = () => {
        dispatch(cartLogout());
        window.location.href = order.redirect_url
        // navigate(order.redirect_url)
    }


    
    return (
        <Container>
            <Navbar/>
            <Wrapper>
                <CrumbContainer>
                    <Crumb>
                        <Number active="false">1</Number>
                        <CrumbTitle active="false">CHECKOUT INFORMATION</CrumbTitle>
                    </Crumb>

                    <Crumb>
                        <Number active="true">2</Number>
                        <CrumbTitle active="true">CONFIRMATION AND PAYMENT</CrumbTitle>
                    </Crumb>

                    <Crumb>
                        <Number active="false">3</Number>
                        <CrumbTitle active="false">CHECKOUT COMPLETE</CrumbTitle>
                    </Crumb>
                </CrumbContainer>

                <CheckoutContainer>
                    <SummaryContainer>
                        <Subtitle>Detail Pemesanan</Subtitle>
                        <TextContainer>
                            <Tax>Nama Penerima</Tax>
                            <Tax>{order.name}</Tax>
                        </TextContainer>

                        <TextContainer>
                            <Tax>No Telepon Penerima</Tax>
                            <Tax>{order.phone}</Tax>
                        </TextContainer>

                        <TextContainer>
                            <Tax>Email Penerima</Tax>
                            <Tax>{order.email}</Tax>
                        </TextContainer>
                        <Subtitle>Detail Alamat Pengiriman</Subtitle>
                        <TextContainer>
                            <Tax>Alamat Pengiriman</Tax>
                            <Tax>{order.address}</Tax>
                        </TextContainer>

                        {/* <TextContainer>
                            <Tax>Kota</Tax>
                            <Tax>Depok</Tax>
                        </TextContainer>

                        <TextContainer>
                            <Tax>Kecamatan</Tax>
                            <Tax>Beji</Tax>
                        </TextContainer> */}
                        <ButtonContainer>
                            <Button type="thin">Edit Informasi Checkout</Button>
                            <Button onClick={startPayment}>Checkout</Button>
                        </ButtonContainer>
                    </SummaryContainer>

                    <SummaryContainer>
                        <Subtitle>Estimasi Harga</Subtitle>
                        <TextContainer>
                            <Subtotal>Sub Total</Subtotal>
                            <Subtotal>Rp. 340.000</Subtotal>
                        </TextContainer>
                        <TextContainer>
                            <Tax>Tax</Tax>
                            <Tax>Rp. 34.000</Tax>
                        </TextContainer>
                        <TextContainer>
                            <Estimated>Total</Estimated>
                            <Estimated>Rp. 364.000</Estimated>
                        </TextContainer>
                    </SummaryContainer>
                </CheckoutContainer>
            </Wrapper>
            <Footer/>
        </Container>
    );
};

export default CheckoutTwo;