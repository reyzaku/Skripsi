import React from 'react';
import styled from 'styled-components';
import Navbar from '../component/Navbar';

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
  return (
      <Container>
          {/* <Navbar/> */}
          <Wrapper>
              <Title>Buat Akun Baru</Title>
              <Form>
                  <Input placeholder='Masukan Nama Depan'></Input>
                  <Input placeholder='Masukan Nama Belakang'></Input>
                  <Input placeholder='Masukan E-mail'></Input>
                  <Input placeholder='Masukan Password' type="password"></Input>
                  <Input placeholder='Masukan Password Ulang' type="password"></Input>
                  <Button>BUAT AKUN</Button>
                  <Text>Atau</Text>
                  <ButtonTwo>MASUK</ButtonTwo>
              </Form>
          </Wrapper>
      </Container>
  );
};

export default Register;