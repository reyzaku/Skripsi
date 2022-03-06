import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../component/Navbar';
import { UserContext } from '../context/UserContext';

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Wrapper = styled.div`
    width: 40%;
    padding: 20px;
`

const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
`

const Title = styled.h2`
    font-size: 40px;
    font-weight: 300;
`

const Input = styled.input`
    flex: 1;
    min-width: 100%;
    margin: 20px 0px;
    height: 40px;
`

const Button = styled.button`
    width: 100%;
    color: white;
    background: black;
    cursor: pointer;
    border: none;
    height: 50px;
    margin: 20px 0px;
    transition: all 0.5s ease;
    &:hover {
        color: white;
        background: #8a2755;
    }
`

const ButtonTwo = styled.button`
    width: 100%;
    color: black;
    background: white;
    cursor: pointer;
    border: solid 0.5px black;
    height: 50px;
    margin: 20px 0px;
    transition: all 0.5s ease;
    &:hover {
        color: white;
        background: lightgray;
    }
`

const Text = styled.p`
    margin: auto;
`

const Register = () => {

    const [user, setUser] = useContext(UserContext)
    const [input, setInput] = useState({
        lastname: "",
        password: "",
        email: "",
        notelp: ""
    })
    let navigate = useNavigate();

    const RegisterHandle = (event) => {
        event.preventDefault()
        console.log(input)
        axios.post("http://localhost:5000/api/auth/register", {
            username: input.username,
            password: input.password,
            email: input.email,
            notelp: input.notelp
        }).then(
            (res) => {
                navigate("/login")
            }
        ).catch((err) => {
            console.log(err);
        })
    }

    const ChangeHandle = (event) => {
        let value = event.target.value
        let name = event.target.name
        console.log(input)
        switch (name) {
            case "username": {
                setInput({ ...input, username: value })
                break;
            }
            case "password": {
                setInput({ ...input, password: value })
                break;
            }
            case "email": {
                setInput({ ...input, email: value })
                break;
            }
            case "telp": {
                setInput({ ...input, notelp: value })
                break;
            }
            default: {
                break;
            }
        }
    }

    return (
        <Container>
            {/* <Navbar/> */}
            <Wrapper>
                <Title>Buat Akun Baru</Title>
                <Form>
                    <Input placeholder='Masukan Username' name="username" value={input.username} onChange={ChangeHandle}></Input>
                    <Input placeholder='Masukan no telp' name="telp" value={input.notelp} onChange={ChangeHandle}></Input>
                    <Input placeholder='Masukan E-mail' name="email" value={input.email} onChange={ChangeHandle}></Input>
                    <Input placeholder='Masukan Password' type="password" name="password" value={input.password} onChange={ChangeHandle}></Input>
                    <Button onClick={RegisterHandle}>BUAT AKUN</Button>
                    <Text>Atau</Text>
                    <ButtonTwo>MASUK</ButtonTwo>
                </Form>
            </Wrapper>
        </Container>
    );
};

export default Register;
