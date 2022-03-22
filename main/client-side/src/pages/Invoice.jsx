import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import Footer from '../component/Footer'
import Navbar from '../component/Navbar'

const Container = styled.div`
    width: ${props => props.subcontainer === true ? "100%" : "50%"};
    display: ${props => props.subcontainer === true ? "flex" : "block"};
    margin: 10px auto;
    border: ${props => props.subcontainer === true ? "none" : "solid 1px lightgray"};

    @media (max-width: 480px) {
        width: 100%;
        margin: 50px auto;
    }
`
const SubContainer = styled.div`
    padding: 50px;

`

const TextContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    margin-top: ${props => props.address === true ? "30px" : "0px"};
    flex-direction: ${props => props.address === true ? "column" : "row"};

    @media (max-width: 480px) {
        flex-direction: column;
        align-items: flex-start;
    }
`

const Title = styled.h2`
    font-size: ${props => props.subtitle === true ? "1.2em" : "32px"};
    font-weight: ${props => props.subtitle === true ? "600" : "400"};
    margin: ${props => props.subtitle === true ? "0px 0px 20px 0px" : "50px auto"};
    text-align: ${props => props.subtitle === true ? "left" : "center"};

    @media (max-width: 480px) {
        margin: ${props => props.subtitle === true ? "0px 0px 20px 0px" : "100px auto"};
    }
`

const Subtitle = styled.h3`
    font-size: 24px;
    font-weight: ${props => props.bold === true ? "600" : "300"};
    color: ${props => props.status === "pending" ? "red" : "green"};
`

const Text = styled.p`
    font-size: ${props => props.big === true ? "1.2em" : "1em"};
    font-weight: ${props => props.bold === true ? "600" : "400"};
`

const Image = styled.img`
    width: 200px;
    height: 200px;
    object-fit: cover;
    object-position: top;
    margin-right: 40px;

    @media (max-width: 480px) {
        width: 100px;
        height: 100px;
    }

`
const Detail = styled.div`
    display: flex;
    flex-direction: column;
`
const ProductTitle = styled.h4`
    font-weight: 300;
    font-size: 20px;
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

const Invoice = () => {
    const {id} = useParams()
    console.log(id)
    const apiUrl = `http://localhost:5000/api/order/find?invoiceId=${id}`
    const [invoice, setInvoice] = useState({})
    const [product, setProduct] = useState([])

    useEffect(() => {
        const getInvoice = async () => {
            const res = await axios.get(apiUrl)
            setInvoice(res.data)
            setProduct(res.product)
            console.log(res.data)
        }
        getInvoice()
        console.log(invoice)
    }, [])

    const startPayment = () => {
        window.open(invoice.redirect_url, "_blank")
    }

    return (
        <div>
            <Navbar/>
            <Title main={true}>Detail Pemesanan</Title>
            <Container>
                <SubContainer>
                    <TextContainer>
                        <Text>Status</Text>
                        <Subtitle bold={true} status={"pending"}>{invoice.status}</Subtitle>
                    </TextContainer>

                    <TextContainer>
                        <Text>No. Invoice</Text>
                        <Text bold={true}>{invoice.invoiceId}</Text>
                    </TextContainer>
                    <TextContainer>
                        <Text>Tanggal Pemesanan</Text>
                        <Text>{invoice.updatedAt}</Text>
                    </TextContainer>
                    <TextContainer>
                        <Text>Total Harga Pesanan</Text>
                        <Text big={true}>Rp. {invoice.gross_amount}</Text>
                    </TextContainer>
                </SubContainer>

                <SubContainer>
                    <Title subtitle={true}>Detail Barang</Title>
                    {invoice?.products?.map((product, index) => (
                        <Container subcontainer={true} key={index + 1}>
                            <Image src={product.image}/>
                            <Detail>
                                <ProductTitle>{product.title}</ProductTitle>
                                <Text>Ukuran : {product.size}</Text>
                            </Detail>
                        </Container>
                    ))}
                </SubContainer>

                <SubContainer>
                    <Title subtitle={true}>Detail Pengiriman</Title>
                    <TextContainer>
                        <Text>Nama Penerima : </Text>
                        <Text>{invoice.name}</Text>
                    </TextContainer>

                    <TextContainer>
                        <Text>No Telp Penerima : </Text>
                        <Text>{invoice.phone}</Text>
                    </TextContainer>

                    <TextContainer>
                        <Text>E-mail Penerima : </Text>
                        <Text>{invoice.email}</Text>
                    </TextContainer>

                    <TextContainer>
                        <Text>No Resi : </Text>
                        <Text>{invoice.resi}</Text>
                    </TextContainer>

                    <TextContainer address={true}>
                        <Text>Alamat : </Text>
                        <Text>{invoice.address}</Text>
                    </TextContainer>
                </SubContainer>
                <SubContainer>
                    <Button>Hubungi Admin</Button>
                    {invoice.status === "pending" &&
                        <Button onClick={startPayment}>Bayar Pesanan</Button>
                    }
                    {
                        invoice.status === "dikirim" &&
                        <Button>Track Pesanan</Button>
                    }
                </SubContainer>
            </Container>
            <Footer/>
        </div>

    )
}

export default Invoice