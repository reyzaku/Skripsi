import React from 'react'
import { Accordion, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import styled from 'styled-components'

const GlobalContainer = styled.div`
    padding: 50px 70px;
`


const Sidebar = () => {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">AISHA.CO</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown title="Product" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Product List</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Add Product</NavDropdown.Item>
                        </NavDropdown>

                        <NavDropdown title="Order" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Order List</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Add Resi</NavDropdown.Item>
                        </NavDropdown>

                        <NavDropdown title="User" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">User List</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Sidebar