import React from 'react'
import Catalog from '../component/Catalog'
import FeaturedProduct from '../component/FeaturedProduct'
import Footer from '../component/Footer'
import Hero from '../component/Hero'
import Navbar from '../component/Navbar'
import Newsletter from '../component/Newsletter'

const Homepage = () => {
    return (
        <div>
            <Navbar/>
            <Hero/>
            <Catalog/>
            <FeaturedProduct/>
            <Newsletter/>
            <FeaturedProduct/>
            <Footer/>
        </div>
    )
}

export default Homepage
