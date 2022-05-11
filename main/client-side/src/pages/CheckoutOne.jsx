import React, { useContext, useEffect, useState } from 'react';
import Footer from '../component/Footer';
import Navbar from '../component/Navbar';
import styled from 'styled-components'
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { publicRequest, userRequest } from "../reqMethod";
import { useSelector } from 'react-redux';
import { convertRupiah } from '../utils/convertRupiah';

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
        flex-direction: column;
    }
`
const Form = styled.form`
    flex: 2;
    margin-right: 100px;

    @media (max-width: 480px) {
        margin: 10px 10px;
    }
`

const InputTitle = styled.p`
    margin-top: 20px;
`

const Input = styled.input`
    width: 100%;
    margin: 10px 0px;
    height: 40px;
    padding-left: 10px;

    @media (max-width: 480px) {
        padding: 0;
    }
`

const SummaryContainer = styled.div`
    flex: 1;
    margin-left: 20px;
    @media (max-width: 480px) {
        margin: 0px 10px;
    }
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

const InputArea = styled.textarea`
    height: 200px;
    width: 100% ;
    margin-top: 10px;
    padding: 10px;

    @media (max-width: 480px) {
        padding: 0;
    }
`

const SubContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
`



const CheckoutOne = () => {
    const { id } = useParams()
    const cart = useSelector(state => state.cart)
    const tax = (cart.total * 10) / 100
    const ongkir = 4500 * cart.quantity
    const navigate = useNavigate()
    const [address, setAddress] = useState({
        name: "",
        notelp: "",
        email: "",
        alamat: "",
        provinsi: "",
        kota: "",
        kodepos: ""
    })


    const changeHandle = (event) => {
        let value = event.target.value
        let name = event.target.name
        console.log(address)
        switch (name) {
            case "name": {
                setAddress({ ...address, name: value })
                break;
            }
            case "notelp": {
                setAddress({ ...address, notelp: value })
                break;
            }
            case "email": {
                setAddress({ ...address, email: value })
                break;
            }
            case "alamat": {
                setAddress({ ...address, alamat: value })
                break;
            }
            case "provinsi": {
                setAddress({ ...address, provinsi: value })
                break;
            }
            case "kota": {
                setAddress({ ...address, kota: value })
                break;
            }
            case "kodepos": {
                setAddress({ ...address, kodepos: value })
                break;
            }
            default: {
                break;
            }
        }
    }

    const submitHandle = async (event) => {
        event.preventDefault()
        userRequest.put(`/order/add/address/${id}`, {
            address: `${address.alamat}, ${address.provinsi}, ${address.kota}, ${address.kodepos}`,
            name: address.name,
            phone: address.notelp,
            email: address.email
        }).then(
            userRequest.put(`/order/add/token/${id}`, {
                gross_amount: cart.total + tax + ongkir
            }).then(
                navigate(`/checkout/confirm/${id}`)
            )
        )

    }

    return (
        <Container>
            <Navbar />
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
                        <Input placeholder='masukan nama penerima' name='name' onChange={changeHandle} value={address.name}></Input>

                        <InputTitle>No Telp</InputTitle>
                        <Input placeholder='masukan no telefon penerima' name='notelp' onChange={changeHandle} value={address.notelp}></Input>

                        <InputTitle>Email</InputTitle>
                        <Input placeholder='masukan Email penerima' name='email' onChange={changeHandle} value={address.email}></Input>

                        <InputTitle>Alamat Lengkap</InputTitle>
                        <InputArea placeholder='masukan alamat lengkap penerima' name='alamat' onChange={changeHandle} value={address.alamat}></InputArea>

                        <InputTitle>Provinsi</InputTitle>
                        <Input placeholder='masukan nama provinsi' name='provinsi' onChange={changeHandle} value={address.provinsi}></Input>

                        <InputTitle>Kota</InputTitle>
                        <Input placeholder='masukan nama kota' name='kota' onChange={changeHandle} value={address.kota}></Input>

                        <InputTitle>Kode Pos</InputTitle>
                        <Input placeholder='masukan nama kode pos' name='kodepos' onChange={changeHandle} value={address.kodepos}></Input>
                        {/* <ButtonContainer>
                            <Button type="thin">Tambah Barang Lagi</Button>
                            <Button>Checkout</Button>
                        </ButtonContainer> */}
                    </Form>

                    <SummaryContainer>
                        <Subtitle>Estimasi Harga</Subtitle>
                        <SubContainer>
                            <Subtotal>Sub Total Barang</Subtotal>
                            <Subtotal>{convertRupiah(cart.total)}</Subtotal>
                        </SubContainer>
                        <SubContainer>
                            <Tax>Ongkos Kirim</Tax>
                            <Tax>{convertRupiah(ongkir)}</Tax>
                        </SubContainer>
                        <SubContainer>
                            <Tax>Pajak</Tax>
                            <Tax>{convertRupiah(tax)}</Tax>
                        </SubContainer>
                        <SubContainer>
                            <Estimated>Total Harga</Estimated>
                            <Estimated>{convertRupiah(((cart.total * 10) / 100) + cart.total)}</Estimated>
                        </SubContainer>
                        <Link to={"/katalog"}>
                            <Button>Tambah Product Lagi</Button>
                        </Link>
                        <Button onClick={submitHandle}>Checkout</Button>
                    </SummaryContainer>
                </CheckoutContainer>
            </Wrapper>
            <Footer />
        </Container>
    );
};

export default CheckoutOne;
