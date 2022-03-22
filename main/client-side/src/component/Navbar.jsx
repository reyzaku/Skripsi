import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import SearchIcon from '@mui/icons-material/Search';
import { Badge } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/userRedux';
import { cartLogout } from '../redux/cartRedux';
import MenuIcon from '@mui/icons-material/Menu';

const Container = styled.div `
    background-color: white;
`

const Wrapper = styled.div `
    padding: 30px 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (max-width: 480px) {
        display: none;
    }
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
    cursor: pointer;
    text-decoration: none;
    color: black;

    @media (max-width: 480px) {
        font-size: 1em;
    }
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
    cursor: pointer;
`

const Register = styled.button`
    padding: 10px 30px;
    background-color: #0c0c0c;
    border: 1px solid lightgray;
    color: #ffffff;
    cursor: pointer;
`

const MobileWrapper = styled.div`
    display: none;

    @media (max-width: 480px) {
        display: block;
        width: 100%;
        position: fixed;
        top: 0;
        background-color: white;
        z-index: 100;
        box-shadow: 0px 5px 20px rgb(0, 0, 0, 0.3);
    }
`

const MobileNav = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 0px 10px;
    padding: 20px 0;
`

const MobileLogo = styled.p`
    font-weight: 600;
    cursor: pointer;
    font-size: 1em;
`

const Hamburger = styled.button`
    background-color: white;
    border: none;
`

const NavLink = styled.a`
    text-decoration: none;
    color: black;
    width: 100%;
    padding: 10px 0px;
    text-align: center;
`


const NavLinkDiv = styled.div`
    text-decoration: none;
    width: 100%;
    padding: 10px 0px;
    text-align: center;
    border-bottom: solid 1px lightgray;

`

const NavWrapper = styled.div`
    display: ${props => props.active === "true" ? "flex" : "none"};
    flex-direction: column;
`

const Navbar = () => {
    const user = useSelector((state) => state.user.currentUser);
    const quantity = useSelector(state => state.cart.quantity)
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [mobile, setMobile] = useState("false")

    const LogoutHandle = () => {
        dispatch(logout())
        dispatch(cartLogout())
        navigate("/")
    }

    const expandHandle = () => {
        if(mobile === "false") {
            setMobile("true")
        } else {
            setMobile("false")
        }
    }

    return (
        <Container>
            <Wrapper>
                <Left>
                    <Link to={"/"} style={{color: "black", textDecoration: "none" }}>
                        <Logo>AISHA.CO</Logo>
                    </Link>
                </Left>
                <Center>
                    <SearchInput>
                        <Input/>
                        <SearchIcon/>
                    </SearchInput>
                </Center>
                {user ? (
                    <Right>
                        <MenuItem>
                            <Login onClick={LogoutHandle}>Logout</Login>
                        </MenuItem>
                        <MenuItem>
                        <Link to={"/profil"}>
                            <Register>Profile</Register>
                        </Link>
                        </MenuItem>
                        <MenuItem>
                            <Badge color="primary">
                                <Link to={"/cart"}>
                                    <Badge badgeContent={quantity} color="primary">
                                        <ShoppingCartOutlinedIcon color="action"/>
                                    </Badge>
                                </Link>
                            </Badge>
                        </MenuItem>
                    </Right>
                ) : (
                    <Right>
                        <MenuItem>
                        <Link to={"/login"}>
                            <Login>Login</Login>
                        </Link>
                        </MenuItem>
                        <MenuItem>
                            <Link to={"/register"}>
                                <Register>Register</Register>
                            </Link>
                        </MenuItem>
                        <MenuItem>
                            <Badge color="primary">
                                <Link to={"/cart"}>
                                    <ShoppingCartOutlinedIcon color="action" />
                                </Link>
                            </Badge>
                        </MenuItem>
                    </Right>
                )}  
            </Wrapper>

            <MobileWrapper>
                <MobileNav active={mobile}>
                    <MobileLogo>AISHA.CO</MobileLogo>
                    <Hamburger onClick={expandHandle}>
                        <MenuIcon/>
                    </Hamburger>
                </MobileNav>
                <NavWrapper active={mobile}>
                    <NavLinkDiv>
                        <Link to={"/"}>
                            <NavLink>Home</NavLink>
                        </Link>
                    </NavLinkDiv>
                    <NavLinkDiv>
                        <Link to={"/cart"}>
                            <NavLink>Keranjang ({quantity})</NavLink>
                        </Link>
                    </NavLinkDiv>
                    <NavLinkDiv>
                        <Link to={"/katalog/wanita"}>
                            <NavLink>Katalog</NavLink>
                        </Link>
                    </NavLinkDiv>
                    {user ?
                        <div>
                            <NavLinkDiv>
                                <Link to={"/profil"}>
                                    <NavLink>Profil</NavLink>
                                </Link>
                            </NavLinkDiv>
                            <NavLinkDiv>
                                <NavLink onClick={LogoutHandle}>Logout</NavLink>
                            </NavLinkDiv>
                        </div>
                    :
                        <div>
                            <NavLinkDiv>
                                <Link to={"/login"}>
                                    <NavLink>Login</NavLink>
                                </Link>
                            </NavLinkDiv>
                            <NavLinkDiv>
                                <Link to={"/register"}>
                                    <NavLink>Register</NavLink>
                                </Link>
                            </NavLinkDiv>
                        </div>
                    }
                </NavWrapper>
            </MobileWrapper>
        </Container>
    )
}

export default Navbar
