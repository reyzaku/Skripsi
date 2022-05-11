import React from 'react'
import styled from 'styled-components'
import hero from '../img/hero.png'
import { Carousel } from 'react-bootstrap'

const Container = styled.div`
    /* width: 100%;
    text-align: center;
    background-image: url(${hero}); */

    @media (max-width: 480px) {
        margin-top: 100px;
    }
`

const Wrapper = styled.div`
    background-color: white;
    height: 100%;
    //padding-top: 200px; */
`

const HeroTitle = styled.p`
    color: white;
    font-size: 54px;
    word-spacing: 5px;
`

const HeroDesc = styled.p`
    color: white;
    font-weight: 100px;
    margin: 0px 20px 20px 20px;
`

const HeroButton = styled.button`
    color: black;
    background: white;
    border: none;
    padding: 20px 40px;
    &:hover {
        color: white;
        background: #8a2755;
    }
`

const Hero = () => {
    return (
        <Container className='container-fluid'>
            <Carousel>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={hero}
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={hero}
                        alt="Second slide"
                    />

                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={hero}
                        alt="Third slide"
                    />

                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </Container>
        // <Container>
        //     <Wrapper>
        //         <HeroTitle>AISHA COLLECTION</HeroTitle>
        //         <HeroDesc>Cari Pakaian Muslim Pria/Wanita/Anak-anak Paling Lengkap Disini!</HeroDesc>
        //         <HeroButton>Liat Katalog</HeroButton>
        //     </Wrapper>
        // </Container>

    )
}

export default Hero
