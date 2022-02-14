import React from 'react';
import styled from 'styled-components';
import Footer from '../component/Footer';
import Navbar from '../component/Navbar';

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
    margin: 50px auto;
    width: 50%;
    justify-content: space-between;
    border: solid 0.5px lightgray;
    padding: 20px;
`
const Subtitle = styled.h3`
    text-align: ${props => props.type === "thinsmall" ? "left" : "center"};
    margin: 20px auto;
    font-size: ${props => props.type === "thinsmall" ? "18px" : "24px"};
    font-weight: ${props => props.bold === "true" ? "700" : "300"};
    border-bottom: ${props => props.type === "thinsmall" ? "solid 0.5px lightgray" : "none"};
    padding-bottom: 20px;
`

const Tax = styled.p``

const TextContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
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

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
`

const CheckoutThree = () => {
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
                        <Number active="false">2</Number>
                        <CrumbTitle active="false">CONFIRMATION AND PAYMENT</CrumbTitle>
                    </Crumb>

                    <Crumb>
                        <Number active="true">3</Number>
                        <CrumbTitle active="true">CHECKOUT COMPLETE</CrumbTitle>
                    </Crumb>
                </CrumbContainer>

                <CheckoutContainer>
                    <Subtitle bold="true">Pemesanan Berhasil</Subtitle>
                    <Subtitle>Terima kasih :)</Subtitle>

                    <Subtitle type="thinsmall" bold="true">Detail Pemesanan</Subtitle>
                        <TextContainer>
                            <Tax>Nama Penerima</Tax>
                            <Tax>Rafi Abdilah</Tax>
                        </TextContainer>

                        <TextContainer>
                            <Tax>No Telepon Penerima</Tax>
                            <Tax>081292610858</Tax>
                        </TextContainer>

                        <TextContainer>
                            <Tax>Email Penerima</Tax>
                            <Tax>081292610858</Tax>
                        </TextContainer>
                        <Subtitle type="thinsmall" bold="true">Detail Alamat Pengiriman</Subtitle>
                        <TextContainer>
                            <Tax>Provinsi</Tax>
                            <Tax>JAWA BARAT</Tax>
                        </TextContainer>

                        <TextContainer>
                            <Tax>Kota</Tax>
                            <Tax>Depok</Tax>
                        </TextContainer>

                        <TextContainer>
                            <Tax>Kecamatan</Tax>
                            <Tax>Beji</Tax>
                        </TextContainer>
                        
                        <ButtonContainer>
                            <Button type="thin">Kembali ke halaman utama</Button>
                            <Button>Lihat Status Pemesanan</Button>
                        </ButtonContainer>                
                </CheckoutContainer>

                
            </Wrapper>
            <Footer/>
        </Container>
    );
};

export default CheckoutThree;
