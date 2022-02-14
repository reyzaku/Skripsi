import React from 'react';
import Footer from '../component/Footer';
import Navbar from '../component/Navbar';
import styled from 'styled-components'

const Container = styled.div``
const Wrapper = styled.div`
    margin: 50px 70px;
`
const CrumbContainer = styled.div`
    display: flex;
    align-content: center;
    justify-content: center;
    border-bottom: solid 0.5px lightgray;
    margin-bottom: 50px;
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
`
const TextContainer = styled.div`
    display: flex;
    justify-content: space-between;
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



const CheckoutOne = () => {
    return (
        <Container>
            <Navbar/>
            <Wrapper>
                <CrumbContainer>
                    <Crumb>
                        <Number active="true">1</Number>
                        <CrumbTitle active="true">CHECKOUT INFORMATION</CrumbTitle>
                    </Crumb>

                    <Crumb>
                        <Number active="false">2</Number>
                        <CrumbTitle active="false">CONFIRMATION AND PAYMENT</CrumbTitle>
                    </Crumb>

                    <Crumb>
                        <Number active="false">3</Number>
                        <CrumbTitle active="false">CHECKOUT COMPLETE</CrumbTitle>
                    </Crumb>
                </CrumbContainer>

                <CheckoutContainer>
                    <Form>
                        <Subtitle>Form Checkout</Subtitle>
                        <InputTitle>Nama Penerima</InputTitle>
                        <Input placeholder='masukan nama penerima'></Input>

                        <InputTitle>Nama Penerima</InputTitle>
                        <Input placeholder='masukan nama penerima'></Input>

                        <InputTitle>Nama Penerima</InputTitle>
                        <Input placeholder='masukan nama penerima'></Input>

                        <InputTitle>Nama Penerima</InputTitle>
                        <Input placeholder='masukan nama penerima'></Input>

                        <InputTitle>Nama Penerima</InputTitle>
                        <Input placeholder='masukan nama penerima'></Input>

                        <InputTitle>Nama Penerima</InputTitle>
                        <Input placeholder='masukan nama penerima'></Input>
                        <ButtonContainer>
                            <Button type="thin">Tambah Barang Lagi</Button>
                            <Button>Checkout</Button>
                        </ButtonContainer>
                    </Form>

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

export default CheckoutOne;
