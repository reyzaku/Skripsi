import React from 'react'
import styled from 'styled-components'
import hero1 from '../img/hero1.png'
import hero2 from '../img/hero2.png'
import hero3 from '../img/hero3.png'
import { Carousel } from 'react-bootstrap'

const Container = styled.div`
    /* width: 100%;
    text-align: center;
    background-image: url(${hero1}); */

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

const Background = styled.div`
    background: black;
`

const Hero = () => {
    let height = 700
    return (
        <Container className='container-fluid'>
            <Carousel>
                <Carousel.Item>
                    <Background>
                        <img
                            className="d-block w-100"
                            src={hero1}
                            height={height}
                            alt="First slide"
                            style={{objectFit: "cover", objectPosition: "30% 20%", opacity: "0.7"}}
                        />
                    </Background>
                    <Carousel.Caption>

                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <Background>
                        <img
                            className="d-block w-100"
                            src={hero2}
                            height={height}
                            alt="First slide"
                            style={{objectFit: "cover", objectPosition: "30% 20%", opacity: "0.7"}}
                        />
                    </Background>
                    <Carousel.Caption>

                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <Background>
                        <img
                            className="d-block w-100"
                            src={hero3}
                            height={height}
                            alt="First slide"
                            style={{objectFit: "cover", objectPosition: "30% 20%", opacity: "0.7"}}
                        />
                    </Background>
                    <Carousel.Caption>

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
