import React from 'react';
import styled from 'styled-components';
import { Send } from '@mui/icons-material';
import Bg from '../img/newsletter1.png'

const Container = styled.div`
    height: 50vh;
    background-image: url(${Bg});
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px 70px 100px 70px;
    flex-direction: column;
`

const Title = styled.h2``

const Description = styled.p`
    margin-bottom: 20px;
`
const InputContainer = styled.div`
    display: flex;
    width: 30%;
    height: 50px;
    justify-content: space-between;
    border: 1px solid lightgray;
`
const Input = styled.input`
    border: none;
    padding-left: 10px;
    flex: 8;
`
const Button = styled.button`
    color: white;
    flex: 1;
    border: none;
    background: black;
    border: none;
    padding: 10px 30px;
    transition: all 0.5s ease;
    &:hover {
        color: white;
        background: #8a2755;
    }
`

const Newsletter = () => {
    return (
        <Container>
            <Title>Newsletter</Title>
            <Description>Test asd asdasdas asdasd</Description>
            <InputContainer>
                <Input placeholder='Email Kamu'/>
                <Button>
                    <Send/>
                </Button>
            </InputContainer>
        </Container>
    );
    
};

export default Newsletter;
