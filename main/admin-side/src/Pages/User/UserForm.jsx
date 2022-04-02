import React, { useState } from 'react'
import { Breadcrumb, Button, Form, Col, Row, Modal, Container } from 'react-bootstrap'
import { GlobalContainer, Title } from '../../PreStyled'
import { userRequest } from '../../reqMethod'
import UseAnimations from "react-useanimations";
import radioButton from 'react-useanimations/lib/checkmark'
import { Link } from 'react-router-dom'

const UserForm = () => {
    const [input, setInput] = useState({
        username: "",
        email: "",
        password: "",
        notelp: "",
        firstName: "",
        lastName: "",
        isAdmin: false,
        image: null,
    })
    const [show, setShow] = useState({
        sucess: false,
        error: false
    })

    const ChangeHandle = (event) => {
        let value = event.target.value
        let name = event.target.name
        console.log(input)
        switch(name) {
            case "username": {
                setInput({...input, username: value})
                break; 
            }
            case "email": {
                setInput({...input, email: value})
                break; 
            }
            case "password": {
                setInput({...input, password: value})
                break; 
            }
            case "notelp": {
                setInput({...input, notelp: value})
                break;
            }
            case "firstName": {
                setInput({...input, firstName: value})
                break; 
            }
            case "lastName": {
                setInput({...input, lastName: value})
                break;
            }
            case "isAdmin": {
                setInput({...input, isAdmin: value})
                break; 
            }
            default:{
                break;
            }
        }
    }

    const HandleButton = (event) => {
        event.preventDefault()
        userRequest.post("/auth/register", input).then(()=>{
            setShow({...show, sucess: true})
            console.log(show)
        }).catch(() => {
            setShow({...show, error: true})
            console.log(show)
        })
    }

    const CloseModal = () => {
        setShow({...show, error: false})
    }

    return (
        <GlobalContainer>
            <Breadcrumb>
                <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="#">User</Breadcrumb.Item>
                <Breadcrumb.Item active>Add User</Breadcrumb.Item>
            </Breadcrumb>
            <Title>Tambah User Baru</Title>
            <Modal
                show={show.sucess}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header>
                    <Modal.Title>Notice</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container className='d-flex justify-content-center align-items-center'>
                        <h4 className='my-5 mx-2'>User Telah Dibuat</h4>
                        <UseAnimations animation={radioButton} autoPlay={true} size={50}/>
                    </Container>
                    <Container className='d-flex justify-content-center'>
                        <Button variant="primary" as={Link} to={`/user`}>Understood</Button>
                    </Container>
                </Modal.Body>
            </Modal>

            <Modal
                show={show.error}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header>
                    <Modal.Title>Notice</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container className='d-flex justify-content-center align-items-center'>
                        <h4 className='my-5 mx-2'>User gagal dibuat</h4>
                        <UseAnimations animation={radioButton} autoPlay={true} size={50}/>
                    </Container>
                    <Container className='d-flex justify-content-center'>
                        <Button variant="danger" onClick={CloseModal}>Understood</Button>
                    </Container>
                </Modal.Body>
            </Modal>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Username :</Form.Label>
                    <Form.Control type="username" placeholder='Masukan username Anda' name='username' onChange={ChangeHandle} value={input.username}/>
                </Form.Group>
                <Row>
                    <Form.Group as={Col} className="mb-3">
                        <Form.Label>Nama Depan :</Form.Label>
                        <Form.Control type="text" placeholder='Masukan Nama Depan Anda' name='firstName' onChange={ChangeHandle} value={input.firstName}/>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3">
                        <Form.Label>Nama Belakang :</Form.Label>
                        <Form.Control type="text" placeholder='Masukan Nama Belakang Anda' name='lastName' onChange={ChangeHandle} value={input.lastName}/>
                    </Form.Group>
                </Row>
                <Form.Group className="mb-3">
                    <Form.Label>Password :</Form.Label>
                    <Form.Control type="password" placeholder='Masukan Password Anda' name='password' onChange={ChangeHandle} value={input.password}/>
                </Form.Group>
                <Row>
                    <Form.Group as={Col} className="mb-3">
                        <Form.Label>Email :</Form.Label>
                        <Form.Control type="text" placeholder='Masukan Email Anda' name='email' onChange={ChangeHandle} value={input.email}/>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3">
                        <Form.Label>No. Handphone :</Form.Label>
                        <Form.Control type="text" placeholder='Masukan Nomor Handphone Anda' name='notelp' onChange={ChangeHandle} value={input.notelp}/>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3">
                        <Form.Label>Admin Status :</Form.Label>
                        <Form.Select aria-label="Default select example"name='isAdmin' onChange={ChangeHandle} value={input.isAdmin}>
                            <option value={false} defaultChecked>No</option>
                            <option value={true}>Yes</option>
                        </Form.Select>
                        <Form.Text className='text-muted'>
                            Jika 'Yes' Maka akun ini akan menjadi Admin
                        </Form.Text>
                    </Form.Group>
                </Row>
                <Button
                    variant='dark'
                    style={{ width: "100%", marginTop: "10px" }}
                    onClick={HandleButton}>
                    Buat User Baru
                </Button>
            </Form>
        </GlobalContainer>
    )
}

export default UserForm