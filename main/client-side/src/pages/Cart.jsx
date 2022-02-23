import { Add, Remove } from '@mui/icons-material';
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

const Cart = (cat) => {

    const [user, setUser] = useContext(UserContext)
    const [amount, setAmount] = useState(0)
    const [cart, setCart] = useState([])
    let userId = user.userId
    let token = user.token
    let navigate = useNavigate()
    const urlApi = `http://localhost:5000/api/cart/find/${userId}`

    useEffect(() =>{
        // if(cart == null) {
            axios.get(urlApi, {headers: { token: `Bearer ${token}` }}).then(res => {
                let data = res.data
                console.log(data)
                setCart(data)
            })
        }, []);
        // }
        // const getCart = async () => {
        //     try {
        //         const res = await axios.get(
        //             urlApi, {headers: { token: `Bearer ${token}` }}
        //         )
        //         setCart(
        //             res.data.map((product) => product.products.map((item) => {
        //                 return {
        //                     productId: item.productId,
        //                     size: item.size,
        //                     image: item.image,
        //                     quantity: item.quantity,
        //                     price: item.price,
        //                     total: item.price * item.quantity
        //                 }
        //             }))
        //         )

                
        //     }catch(err){}
        // };
        // getCart();
        
    // for(let i = 0; i <= cart.length; i++) {
    //     cart.map(subArray => subArray.products.map((item) => {
    //         return (
    //             setAmount(amount + (item.quantity * item.price))
    //         )
    //     }))
    // }
    // cart.map(subArray => subArray.products.map((item, index) => {
    //     console.log(`id: ${index + 1} productId: ${item.productId} price: Rp. ${item.price} size: ${item.size} quantity: ${item.quantity} total: ${item.total}`)
    // }))
    // cart.map((item, index) =>  {
    //     console.log(`quantity: ${item.quantity}, id: ${index + 1}`)
    // })

    const numb = 1000000;
    const format = numb.toString().split('').reverse().join('');
    const convert = format.match(/\d{1,3}/g);
    const rupiah = 'Rp ' + convert.join('.').split('').reverse().join('')
    

    console.log(rupiah)
    
    let tax = (amount * 10)/100
    console.log(cart)
    const checkoutHandle = () => {
        let date = new Date()
        let day = date.getDate()
        let month = date.getMonth()
        let year = date.getFullYear()
        let rand = Math.floor(Math.random() * 3000)
        let invoiceNum = `INV-${day}${month}${year}${rand}`

        console.log(`amount: ${amount}`)
        
        axios.post("http://localhost:5000/api/order", {
            userId: user.userId,
            invoiceId: invoiceNum,
            products: [{
                productId: cart.products.id,
                quantity: cart.products.quantity,
                size: cart.products.size
            }],
            gross_amount: amount,
        },
        {
            headers: {token: `Bearer ${token}`},
        }).then(
            navigate(`/checkout/form/${invoiceNum}`)
        ).catch((err)=>{
            alert("Gagal").json(err)
        })

    }

    return (
        <Container>
            {console.log(cart)}
            <Navbar/>
            <Title>Keranjang Kamu</Title>
            <Wrapper>
            {/* {console.log(`id: ${index + 1} productId: ${item.productId} price: Rp. ${item.price} size: ${item.size} quantity: ${item.quantity} total: ${item.total}`)} */}
                <ProductContainer>
                    <Subtitle>Daftar Produk</Subtitle>
                    {cart.map(subArray => subArray.products.map((item, index) => {       
                        return (
                            <ProductCard key={index + 1}>
                                <Image src={item.image}/>
                                <Detail>
                                    <ProductTitle>Armany Blue 1</ProductTitle>
                                    <Variant>Ukuran : {item.size}</Variant>
                                    <Price>
                                    </Price>
                                    <Counter>
                                        <RemoveAmount><Remove/></RemoveAmount>
                                        <Count>{item.quantity}</Count>
                                        <AddAmount><Add/></AddAmount>
                                    </Counter>
                                </Detail>
                            </ProductCard>
                        )                 
                    }))}
                </ProductContainer>
                <SummaryContainer>
                    <Subtitle>Estimasi Harga</Subtitle>
                    <Subtotal></Subtotal>
                    <Tax>{tax}</Tax>
                    <Estimated>{amount + tax}</Estimated>
                    <Link to={"/katalog"}>
                        <Button>Tambah Product Lagi</Button>
                    </Link>
                    <Button onClick={checkoutHandle}>Checkout</Button>
                </SummaryContainer>
            </Wrapper>
            <Footer/>
        </Container>

    );

};

export default Cart;
