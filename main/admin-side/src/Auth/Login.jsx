import React, { useState } from 'react'
import { Container } from '../PreStyled'
import { Button, Form } from 'react-bootstrap'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../redux/authCall'

const Wrapper = styled.div`
    width: 30%;
    margin: auto;
    top: 50%;
`

const Title = styled.h2`
    font-size: 40px;
    font-weight: 300;
    margin-bottom: 50px;
`



const Login = () => {
    const [input, setInput] = useState({ username: "", password: "" })
    const dispatch = useDispatch();


    const changeHandle = (event) => {
        let value = event.target.value
        let name = event.target.name
        switch (name) {
            case "username": {
                setInput({ ...input, username: value })
                break;
            }
            case "password": {
                setInput({ ...input, password: value })
                break;
            }
            default: { break; }
        }
    }

    const HandleLogin = (event) => {
        event.preventDefault()
        login(dispatch, input)
    }

    return (
        <Container>
            <Wrapper>
                <Title>Admin Dashboard Aisha Collection</Title>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Email :</Form.Label>
                        <Form.Control type="text" placeholder='Enter your email' />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Password :</Form.Label>
                        <Form.Control type="password" placeholder='Enter your email' />
                    </Form.Group>
                    <Button variant='primary' onClick={HandleLogin}>Masuk</Button>
                </Form>
            </Wrapper>
        </Container>
    )
}

export default Login