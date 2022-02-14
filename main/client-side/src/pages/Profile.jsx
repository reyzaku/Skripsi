import React from 'react';
import styled from 'styled-components';
import Footer from '../component/Footer';
import Navbar from '../component/Navbar';
import ProfileImage from "../img/Profile.jpg";

const Container = styled.div``
const Wrapper = styled.div`
    margin: 50px 70px;
`
const ProfileCard = styled.div`
    text-align: center;
`
const Image = styled.img`
    width: 200px;
    height: 200px;
    object-fit: cover;
    object-position: bottom;
    border-radius: 50%;
    margin-bottom: 20px;
`
const Name = styled.h2`
    font-size: 24px;
    font-weight: 300;
    margin-bottom: 10px;
`
const Email = styled.h4`
    margin-bottom: 20px;
    font-size: 18px;
    font-weight: 400;
`
const Button = styled.button`
    width: 20%;
    margin: 10px 0px;
    height: 40px;
    border: none;
    background-color: black;
    color: white;
    transition: all 0.5s ease;
    &:hover {
        color: white;
        background: #8a2755;
    }
`
const ProfileNav = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

const NavCard = styled.div`
    margin: 50px 20px;
    padding: 20px;
    width: 20vw;
    border: solid 0.5px lightgray;
    text-align: center;
`

const NavTitle = styled.h3`
    margin-bottom: 10px;
`

const Count = styled.h3`
    font-size: 54px;
    font-weight: 300;
    margin-bottom: 20px;   
`

const NavButton = styled.button`
    height: 40px;
    border: none;
    padding: 0px 40px;
    background-color: black;
    color: white;
    transition: all 0.5s ease;
    &:hover {
        color: white;
        background: #8a2755;
    }
`


const Profile = () => {
    return (
        <Container>
            <Navbar/>
            <Wrapper>
                <ProfileCard>
                    <Image src={ProfileImage}/>
                    <Name>M Rafi Abdillah</Name>
                    <Email>rabdilah7@gmail.com</Email>
                    <Button>Edit Profile</Button>
                </ProfileCard>

                <ProfileNav>
                    <NavCard>
                        <NavTitle>Transaksi Saya</NavTitle>
                        <Count>10</Count>
                        <NavButton nav>Lihat Daftar Transaksi</NavButton>
                    </NavCard>

                    <NavCard>
                        <NavTitle>Alamat Saya</NavTitle>
                        <Count>10</Count>
                        <NavButton nav>Lihat Daftar Alamat</NavButton>
                    </NavCard>

                    <NavCard>
                        <NavTitle>Keranjang Saya</NavTitle>
                        <Count>10</Count>
                        <NavButton nav>Lihat Keranjang</NavButton>
                    </NavCard>
                </ProfileNav>
            </Wrapper>
            <Footer/>
        </Container>
        
    );
};

export default Profile;
