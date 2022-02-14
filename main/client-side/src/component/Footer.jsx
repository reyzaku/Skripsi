import { Copyright, Facebook, Instagram, Twitter } from '@mui/icons-material';
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    background-color: black;
`

const Container = styled.div`
    display: flex;
    height: 40vh;
    background-color: black;
    padding: 50px 70px 0px 70px;
`
const Left = styled.div`
    flex: 1;
`
const Right = styled.div`
    flex: 1;
`
const Center = styled.div`
    flex: 1;
`

const Logo = styled.h2`
    font-weight: 400;
    font-size: 54px;
    color: white;
    padding-bottom: 20px;
`
const Desc = styled.p`
    color: white;
    padding-bottom: 20px;
`
const SocialMediaContainer = styled.div`
    display: flex;
    color: white;
`
const SocialIcon = styled.div`
    color: white;
    padding-right: 20px;
    padding-top: 20px;
    transition: all 0.5s ease;
    &:hover {
        color: #8a2755;
    }
`
const Address = styled.p``
const Map = styled.div``

const CopyrightText = styled.p`
    color: white;
    text-align: center;
    padding-bottom: 20px;
`


const Footer = () => {
    return (
        <Wrapper>
            <Container>
                <Left>
                    <Logo>AISHA.CO</Logo>
                    <Desc>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae laboriosam cumque enim velit aliquid dolor alias repellat? Temporibus nulla, dolores hic numquam similique culpa reiciendis ad dolorum recusandae dolorem quibusdam.
                    </Desc>
                    <SocialMediaContainer>
                        <SocialIcon>
                            <Facebook/>
                        </SocialIcon>
                        <SocialIcon>
                            <Instagram/>
                        </SocialIcon>
                        <SocialIcon>
                            <Twitter/>
                        </SocialIcon>
                    </SocialMediaContainer>
                </Left>

                <Center>

                </Center>
                <Right>
                    <Address>

                    </Address>
                    <Map/>
                </Right>
            </Container>
            <CopyrightText>Copyright 2022 @ Aisha Collection</CopyrightText>
        </Wrapper>
        
    );
};

export default Footer;
