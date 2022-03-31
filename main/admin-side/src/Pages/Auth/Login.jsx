import React, { useState } from 'react'
import { GlobalContainer } from '../../PreStyled'
import { Button, Form } from 'react-bootstrap'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../redux/authCall'

const Wrapper = styled.div`
    width: 30%;
    margin: 100px auto;
`

const Title = styled.h2`
    font-size: 40px;
    font-weight: 300;
    margin-bottom: 50px;
`

const CustomButton = styled.button`
    color: ${(props) => {
        switch(props.theme){
            case "dark": {
                return "#ffffff"
            }
            case "light": {
                return "#161616"
            }
            case "danger": {
                return "#A83A3A"
            }
            case "success": {
                return "#4FA80C"
            }
            case "warning": {
                return "#BD5C0C"
            }
            default: {
                return "black"
            }
        }
    }};
    
    background-color: ${(props) => {
        switch(props.theme){
            case "dark": {
                return "#161616"
            }
            case "light": {
                return "#ffffff"
            }
            case "danger": {
                return "#f77575"
            }
            case "success": {
                return "#8EE789"
            }
            case "warning": {
                return "#ffd06b"
            }
            default: {
                return "white"
            }
        }
    }};
    padding: 10px;
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
        <GlobalContainer>
            <Wrapper>
                <Title>Admin Dashboard Aisha Collection</Title>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Email :</Form.Label>
                        <Form.Control type="text" placeholder='Masukan Email Anda' name='username' value={input.username} onChange={changeHandle}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Password :</Form.Label>
                        <Form.Control type="password" placeholder='Masukan Password Anda' name='password' value={input.password} onChange={changeHandle}/>
                    </Form.Group>
                    <Button 
                        variant='dark' 
                        style={{width: "100%", marginTop: "10px"}} 
                        onClick={HandleLogin}>
                        Masuk
                    </Button>
                    <Form.Text className='text-muted'>
                        Jika Anda Lupa password/email, hubungi Administrator
                    </Form.Text>
                </Form>
            </Wrapper>
        </GlobalContainer>
    )
}

export default Login