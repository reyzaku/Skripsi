import React from 'react'
import styled from 'styled-components'
import hero from '../img/hero.png'

const Container = styled.div`
    width: 100%;
    height: 60vh;
    text-align: center;
    background-image: url(${hero});

    @media (max-width: 480px) {
        margin: auto;
        height: 100vh;
    }
`

const Wrapper = styled.div`
    height: 100%;
    padding-top: 200px;
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
        <Container>
            <Wrapper>
                <HeroTitle>AISHA COLLECTION</HeroTitle>
                <HeroDesc>Cari Pakaian Muslim Pria/Wanita/Anak-anak Paling Lengkap Disini!</HeroDesc>
                <HeroButton>Liat Katalog</HeroButton>
            </Wrapper>
        </Container>

    )
}

export default Hero
