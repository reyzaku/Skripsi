import { Add, Remove } from '@mui/icons-material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Footer from '../component/Footer';
import Navbar from '../component/Navbar';
import Newsletter from '../component/Newsletter';
import Gambar from '../img/ProductDummy1.jpeg';


const Container = styled.div`

`

const Wrapper = styled.div`
    margin: 50px 70px;
    display: flex;
`

const ImageContainer = styled.div`
    flex: 1;
    margin-right: 50px;
`

const Image = styled.img`
    width: 75%;
`

const ImageSlider = styled.div`

`

const InfoContainer = styled.div`
    flex: 1;

`

const ProductTitle = styled.h2`
    margin-bottom: 20px;
    font-size: 50px;
    font-weight: 200;
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
    background: black;
    cursor: pointer;
    border: none;
    padding: 10px 30px;
    transition: all 0.5s ease;
    &:hover {
        color: white;
        transform: scale(1.05);
        background: #8a2755;
    }
`


const Product = (cat) => {

    const {id} = useParams()
    const [product, setProduct] = useState({})
    const urlApi = `http://localhost:5000/api/product/find/${id}`
    useEffect(() =>{
        const getProduct = async () => {
            try {
                const res = await axios.get(
                    urlApi
                    // cat 
                    //  `http://localhost:5000/api/product?category=${cat}`
                    // : "http://localhost:5000/api/product"
                )
                setProduct(res.data)
            }catch(err){}
        };
        getProduct();
    }, [cat]);
    

    return (
      <Container>
          {console.log(product)}
          <Navbar/>
          <Wrapper>
              <ImageContainer>
                  <Image src={product.image}/>
                  <ImageSlider/>
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
                        <FilterSelection>    
                            <Option>S</Option>
                            <Option>M</Option>
                            <Option>L</Option>
                            <Option>XL</Option>
                        </FilterSelection>
                      </SizeSelector>
                  </VariantContainer>
                  <AmountContainer>
                      <AmountText>Jumlah :</AmountText>
                      <AmountButton>
                            <RemoveAmount><Remove/></RemoveAmount>
                            <Amount>1</Amount>
                            <AddAmount><Add/></AddAmount>
                      </AmountButton>
                  </AmountContainer>
                  <Button>Add Product to Cart</Button>
              </InfoContainer>
          </Wrapper>
          <Newsletter/>
          <Footer/>
      </Container>
  );
};

export default Product;