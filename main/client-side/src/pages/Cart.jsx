import { Add, Remove, SignalCellularNullSharp } from '@mui/icons-material';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import CartCard from '../component/CartCard';
import Footer from '../component/Footer';
import Navbar from '../component/Navbar';
import { OrderContext, OrderProvider } from '../context/OrderContext';
import { UserContext } from '../context/UserContext';
import Product1 from "../img/ProductDummy1.jpeg"
import Product2 from "../img/ProductDummy2.jpeg"
import { useSelector } from 'react-redux';
import { convertRupiah } from '../utils/convertRupiah';
import { userRequest } from '../reqMethod';

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

const SubContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
`

const Cart = () => {
    const user = useSelector(state => state.user.currentUser)
    const cart = useSelector(state => state.cart)
    let navigate = useNavigate()
    const tax = (cart.total * 10)/ 100
    const ongkir = 4500 * cart.quantity
    console.log(user._id)
    console.log(cart.total)
    // const [user, setUser] = useContext(UserContext)
    // const [amount, setAmount] = useState(0)
    // const [cart, setCart] = useState([])
    // let userId = user.userId
    // let token = user.token
    // const urlApi = `http://localhost:5000/api/cart/find/${userId}`

    // useEffect(() => {
    //     // if(cart == null) {
    //     axios.get(urlApi, { headers: { token: `Bearer ${token}` } }).then(res => {
    //         let data = res.data
    //         console.log(data)
    //         setCart(data)
    //     })
    // }, []);
    
    // const numb = 1000000;
    // const format = numb.toString().split('').reverse().join('');
    // const convert = format.match(/\d{1,3}/g);
    // const rupiah = 'Rp ' + convert.join('.').split('').reverse().join('')


    // console.log(rupiah)

    // let tax = (amount * 10) / 100
    // console.log(cart)
    const checkoutHandle = () => {
        let date = new Date()
        let day = date.getDate()
        let month = date.getMonth()
        let year = date.getFullYear()
        let rand = Math.floor(Math.random() * 3000)
        let invoiceNum = `ORDER-${day}${month}${year}${rand}`

        axios.post("http://localhost:5000/api/order/add", {
            userId: user._id,
            invoiceId: invoiceNum,
            products: cart.products,
            gross_amount: cart.total + tax + ongkir
        }).then(
            navigate(`/checkout/form/${invoiceNum}`)
        )
    }

    return (
        <Container>
            <Navbar />
            <Title>Keranjang Kamu</Title>
            <Wrapper>
                {/* {console.log(`id: ${index + 1} productId: ${item.productId} price: Rp. ${item.price} size: ${item.size} quantity: ${item.quantity} total: ${item.total}`)} */}
                <ProductContainer>
                    <Subtitle>Daftar Produk</Subtitle>
                    {cart.products.map((product, index) => (
                        <ProductCard key={index + 1}>
                            <Image src={product.image} />
                            <Detail>
                                <ProductTitle>{product.title}</ProductTitle>
                                <Variant>Ukuran : {product.size}</Variant>
                                <Price>{convertRupiah(product.price * product.quantity)}</Price>
                                <Counter>
                                    <RemoveAmount><Remove /></RemoveAmount>
                                    <Count>{product.quantity}</Count>
                                    <AddAmount><Add /></AddAmount>
                                </Counter>
                            </Detail>
                        </ProductCard>
                    ))}
                </ProductContainer>
                <SummaryContainer>
                    <Subtitle>Estimasi Harga</Subtitle>
                    <SubContainer>
                        <Subtotal>Sub Total Barang</Subtotal>
                        <Subtotal>{convertRupiah(cart.total)}</Subtotal>
                    </SubContainer>
                    <SubContainer>
                        <Tax>Ongkos Kirim</Tax>
                        <Tax>{convertRupiah(4500 * cart.quantity)}</Tax>
                    </SubContainer>
                    <SubContainer>
                        <Tax>Pajak</Tax>
                        <Tax>{convertRupiah((cart.total * 10)/ 100)}</Tax>
                    </SubContainer>
                    <SubContainer>
                        <Estimated>Total Harga</Estimated>
                        <Estimated>{convertRupiah(((cart.total * 10)/ 100) + cart.total)}</Estimated>
                    </SubContainer>
                    <Link to={"/katalog"}>
                        <Button>Tambah Product Lagi</Button>
                    </Link>
                    <Button onClick={checkoutHandle}>Checkout</Button>
                </SummaryContainer>
            </Wrapper>
            <Footer />
        </Container>

    );

};

export default Cart;
