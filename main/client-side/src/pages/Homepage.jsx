import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Catalog from '../component/Catalog'
import FeaturedProduct from '../component/FeaturedProduct'
import Footer from '../component/Footer'
import Hero from '../component/Hero'
import Navbar from '../component/Navbar'
import Newsletter from '../component/Newsletter'
import { loadShop } from '../redux/cartRedux';
import { userRequest } from '../reqMethod'

const Homepage = () => {
    const dispatch = useDispatch()
    const newProduct = {
        title: "Product Terbaru"
    }
    const featuredProduct = {
        title: "Featured Product"
    }

    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await userRequest.get("/product")
                console.log("data aquired")
                dispatch(loadShop(res.data))
            } catch (err) { console.log("error get data") }
        };
        getProduct();
    }, []);
    return (
        <div>
            <Navbar/>
            <Hero/>
            <Catalog/>
            <FeaturedProduct title={newProduct}/>
            <Newsletter/>
            <FeaturedProduct title={featuredProduct}/>
            <Footer/>
        </div>
    )
}

export default Homepage
