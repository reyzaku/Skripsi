import React, { useState } from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../component/Navbar';
import { UserContext } from '../context/UserContext';
import axios, { Axios } from 'axios'

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

const Login = () => {
    const [user, setUser] = useContext(UserContext)
    const [input, setInput] = useState({username: "", password: ""})
    let navigate = useNavigate();
    const LoginHandle = (event) => {
        event.preventDefault()
        axios.post("http://localhost:5000/api/auth/login", {
            username: input.username,
            password: input.password
        }).then(
            (res)=>{
                console.log(res)
                var user = res.data
                var token = res.data.accessToken
                var currentUser = {username: user.username, userId: user._id, token}
                setUser(currentUser)
                localStorage.setItem("user", JSON.stringify(currentUser))
                navigate("/")
            }
        ).catch((err)=>{
            alert("password atau username Salah")
        })
    }

    const changeHandle = (event) =>{
        let value = event.target.value
        let name = event.target.name
        switch(name){
            case "username": {
                setInput({...input, username: value})
                break;
            }
            case "password": {
                setInput({...input, password: value})
                break;
            }
            default:{break;}
        }
    }

    return (
      <Container>
          {/* <Navbar/> */}
          <Wrapper>
              <Title>Masuk ke Aisha Collection</Title>
              <Form>
                  <Input placeholder='Masukan E-mail' name="username" value={input.username} onChange={changeHandle}></Input>
                  <Input placeholder='Masukan Password' type="password" name="password" value={input.password} onChange={changeHandle}></Input>
                  <Button onClick={LoginHandle}>MASUK</Button>
                  <Text>Atau</Text>
                  <ButtonTwo>BUAT AKUN BARU</ButtonTwo>
                  <Text>Lupa Password?</Text>
              </Form>
          </Wrapper>
      </Container>
  );
};

export default Login;
