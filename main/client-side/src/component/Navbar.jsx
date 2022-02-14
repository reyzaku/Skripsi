import React from 'react'
import styled from 'styled-components'
import SearchIcon from '@mui/icons-material/Search';
import { Badge } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

const Container = styled.div `
    height: 100px;
    background-color: white;
`

const Wrapper = styled.div `
    padding: 30px 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const Left = styled.div `
    flex: 1;
`
const Center = styled.div `
    flex: 1;
`
const Right = styled.div `
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`

const Logo = styled.h1 `
    font-weight: 400;
`

const Input = styled.input `
    border: none;
    font-size: 14px;
    width: 100%;
    margin-right: 10px;
    height: 90%;
    
`

const SearchInput = styled.div`
    display: flex;
    align-items: center;
    height: 40px;
    padding: 0 10px;
    justify-content: space-between;
    margin: 0 20px;
    text-align: center;
    border: 0.5px solid lightgray;
`

const MenuItem = styled.div`
    font-size: 14px;
    cursor: pointer;
    margin-left: 20px;
`

const Login = styled.button`
    padding: 10px 30px;
    background-color: white;
    border: 1px solid lightgray;
    color: #0c0c0c;
`

const Register = styled.button`
    padding: 10px 30px;
    background-color: #0c0c0c;
    border: 1px solid lightgray;
    color: white;
`

const Navbar = () => {
    return (
        <Container>
            <Wrapper>
                <Left>
                    <Logo>AISHA.CO</Logo>
                </Left>
                <Center>
                    <SearchInput>
                        <Input/>
                        <SearchIcon/>
                    </SearchInput>
                </Center>
                <Right>
                    <MenuItem>
                        <Login>Login</Login>
                    </MenuItem>
                    <MenuItem>
                        <Register>Register</Register>
                    </MenuItem>
                    <MenuItem>
                        <Badge badgeContent={4} color="primary">
                            <ShoppingCartOutlinedIcon color="action" />
                        </Badge>
                    </MenuItem>
                </Right>
            </Wrapper>
        </Container>
    )
}

export default Navbar
