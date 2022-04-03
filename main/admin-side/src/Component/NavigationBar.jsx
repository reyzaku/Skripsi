import React from 'react'
import { Button, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../redux/userRedux';


const NavigationBar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const LogoutHandle = () => {
        dispatch(logout())
        navigate("/login")
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand as={Link} to={`/`}>AISHA.CO</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown title="Product" id="collasible-nav-dropdown">
                            <NavDropdown.Item as={Link} to={`/produk`}>Product List</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to={`/produk/add`}>Add Product</NavDropdown.Item>
                        </NavDropdown>

                        <NavDropdown title="Order" id="collasible-nav-dropdown">
                            <NavDropdown.Item as={Link} to={`/order`}>Order List</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to={`/`}>Add Resi</NavDropdown.Item>
                        </NavDropdown>

                        <NavDropdown title="User" id="collasible-nav-dropdown">
                            <NavDropdown.Item as={Link} to={`/user`}>User List</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to={`/user/add`}>Add User</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
                <Button variant="outline-light" onClick={LogoutHandle}>Logout</Button>
            </Container>
        </Navbar>
    )
}

export default NavigationBar