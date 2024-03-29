import { Add, Remove } from '@mui/icons-material';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Footer from '../component/Footer';
import Navbar from '../component/Navbar';
import Newsletter from '../component/Newsletter';
import { UserContext } from '../context/UserContext';
import Gambar from '../img/ProductDummy1.jpeg';
import { addProduct } from '../redux/cartRedux';
import { useDispatch, useSelector } from 'react-redux';
import { convertRupiah } from '../utils/convertRupiah';
import { userRequest } from '../reqMethod';



const Container = styled.div`
    width: 100%;
`

const Wrapper = styled.div`
    margin: 50px 70px;
    display: flex;
    flex-wrap: wrap;

    @media (max-width: 480px) {
        margin: 10px 10px;
        flex-direction: column;
    }
`

const ImageContainer = styled.div`
    flex: 1;
    margin-right: 50px;

    @media (max-width: 480px) {
        width: 100%;
        margin: auto;
    }
`

const Image = styled.img`
    width: 75%;

    @media (max-width: 480px) {
        width: 100%;
    }
`

const InfoContainer = styled.div`
    flex: 1;

    @media (max-width: 480px) {
        flex: 0;
    }
`

const ProductTitle = styled.h2`
    margin-bottom: 20px;
    font-size: 50px;
    font-weight: 200;

    @media (max-width: 480px) {
        font-size: 2em;
    }
`

const ProductDesc = styled.p`
    margin-bottom: 20px;
`

const ProductPrice = styled.h3`
    margin-bottom: 20px;
`

const VariantContainer = styled.div`

`

const SizeText = styled.p`
    margin-right: 10px;
`

const SizeSelector = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`

const FilterSelection = styled.select`
  padding: 10px 20px;
  margin-top: 10px;
  cursor: pointer;
  border-color: lightgray;
`

const Option = styled.option`
  padding: 10px 20px;
`

const AmountContainer = styled.div`
    margin-bottom: 20px;
`
const AmountText = styled.p`
    margin-bottom: 20px;
`
const AmountButton = styled.div`
    display: flex;
`
const AddAmount = styled.button`
    padding: 10px 15px;
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
    padding: 10px 15px;
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
const Amount = styled.span`
    margin: 0px 20px;
    padding: 10px 20px;
    border: 1px solid lightgray;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Button = styled.button`
    width: 100%;
    color: white;
    background: ${props => props.active === "true" ? "black" : "gray"};
    cursor: pointer;
    border: none;
    padding: 10px 30px;
    transition: all 0.5s ease;
    &:hover {
        color: white;
        transform: scale(${props => props.active === "true" ? "1.5" : "1"};);
        background: ${props => props.active === "true" ? "#8a2755" : "gray"};
    }

    @media (max-width: 480px) {
        width: 100%;
    }
`


const Product = (cat) => {
    const user = useSelector((state) => state.user.currentUser);
    const { id } = useParams()
    let navigate = useNavigate()
    const [product, setProduct] = useState({})
    const [quantity, setQuantity] = useState(1)
    const [size, setSize] = useState("")
    const dispatch = useDispatch()
    const urlApi = `/product/${id}`

    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await userRequest.get(
                    `/product/${id}`
                )
                setProduct(res.data)
                console.log(res.data)
            } catch (err) { }
        };
        getProduct();
    }, []);

    const addToCartHandle = () => {
        if (user === null) {
            navigate("/login")
        } else {
            dispatch(addProduct({ ...product, quantity, size, total: product.price * quantity}))
        }
    }

    const quantityHandle = (type) => {
        if (type === "dec") {
            quantity > 1 && setQuantity(quantity - 1);
        } else {
            setQuantity(quantity + 1);
        }
    };

    const changeHandle = (event) => {
        let value = event.target.value
        let name = event.target.name

        switch (name) {
            case "sizeContainer": {
                setSize(value)
                break;
            }
            case "quantityContainer": {
                setQuantity(value)
                break;
            }
            default: {
                break;
            }
        }
    }


    return (
        <Container>
            <Navbar />
            <Wrapper>
                <ImageContainer>
                    <Image src={product.image} />
                </ImageContainer>
                <InfoContainer>
                    <ProductTitle>
                        {product.title}
                    </ProductTitle>
                    <ProductDesc>
                        {product.desc}
                    </ProductDesc>
                    <ProductPrice>
                        Rp. {product.price}
                    </ProductPrice>
                    <VariantContainer>
                        <SizeSelector>
                            <SizeText>Pilih Ukuran :</SizeText>
                            <FilterSelection onChange={changeHandle} name="sizeContainer">
                                <Option value="S" defaultValue={size}>S</Option>
                                <Option value="M">M</Option>
                                <Option value="L">L</Option>
                                <Option value="XL">XL</Option>
                            </FilterSelection>
                        </SizeSelector>
                    </VariantContainer>
                    <AmountContainer>
                        <AmountText>Jumlah :</AmountText>
                        <AmountButton>
                            <RemoveAmount onClick={() => quantityHandle("dec")}><Remove /></RemoveAmount>
                            <Amount>{quantity}</Amount>
                            <AddAmount onClick={() => quantityHandle("inc")}><Add /></AddAmount>
                        </AmountButton>
                    </AmountContainer>
                    {product.inStock ? 
                        <Button active="true" onClick={addToCartHandle}>Add Product to Cart</Button> :
                        <Button active="false">Stock Habis</Button>
                    }
                </InfoContainer>
            </Wrapper>
            <Newsletter />
            <Footer />
        </Container>
    );
};

export default Product;
