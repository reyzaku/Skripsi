import React, { useEffect, useState } from 'react'
import { Breadcrumb, Form, Row, Col, Button, Container, Modal } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { GlobalContainer, Title } from '../../PreStyled'
import { userRequest } from '../../reqMethod'
import UseAnimations from "react-useanimations";
import radioButton from 'react-useanimations/lib/checkmark'
import { Link } from 'react-router-dom'

const UserEdit = () => {
    const [data, setData] = useState({
        username: "",
        email: "",
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
    const {id} = useParams()

    const HandleButton = (event) => {
        event.preventDefault()
        userRequest.put(`/user/${id}`, data).then(()=>{
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

    useEffect(() => {
        const getData = async () => {
            const res = await userRequest.get(`/user/find/${id}`)
            setData({
                username: res.data.others.username,
                email: res.data.others.email,
                notelp: res.data.others.notelp,
                firstName: res.data.others.fullName.split(" ")[0],
                lastName: res.data.others.fullName.split(" ")[1],
                isAdmin: res.data.others.isAdmin,
                image: null,
            })
            console.log(res.data)
        }
        getData()
        console.log(data)
    }, [])

    const ChangeHandle = (event) => {
        let value = event.target.value
        let name = event.target.name
        console.log(data)
        switch(name) {
            case "username": {
                setData({...data, username: value})
                break; 
            }
            case "email": {
                setData({...data, email: value})
                break; 
            }
            case "password": {
                setData({...data, password: value})
                break; 
            }
            case "notelp": {
                setData({...data, notelp: value})
                break;
            }
            case "firstName": {
                setData({...data, firstName: value})
                break; 
            }
            case "lastName": {
                setData({...data, lastName: value})
                break;
            }
            case "isAdmin": {
                setData({...data, isAdmin: value})
                break; 
            }
            default:{
                break;
            }
        }
    }

    return (
        <GlobalContainer>
            <Breadcrumb>
                <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="#">User</Breadcrumb.Item>
                <Breadcrumb.Item active>Edit User [userId]</Breadcrumb.Item>
            </Breadcrumb>
            <Title>Edit User [userId]</Title>
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
                        <h4 className='my-5 mx-2'>User berhasil di edit</h4>
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
                        <h4 className='my-5 mx-2'>User gagal diedit</h4>
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
                    <Form.Control type="text" name='username' onChange={ChangeHandle} value={data.username}/>
                </Form.Group>
                <Row>
                    <Form.Group as={Col} className="mb-3">
                        <Form.Label>Nama Depan :</Form.Label>
                        <Form.Control type="text" placeholder='Masukan Nama Depan Anda' name='firstName' onChange={ChangeHandle} value={data.firstName}/>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3">
                        <Form.Label>Nama Belakang :</Form.Label>
                        <Form.Control type="text" placeholder='Masukan Nama Belakang Anda' name='lastName' onChange={ChangeHandle} value={data.lastName}/>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col} className="mb-3">
                        <Form.Label>Email :</Form.Label>
                        <Form.Control type="text" placeholder='Masukan Email Anda' name='email' onChange={ChangeHandle} value={data.email}/>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3">
                        <Form.Label>No. Handphone :</Form.Label>
                        <Form.Control type="text" placeholder='Masukan Nomor Handphone Anda' name='notelp' onChange={ChangeHandle} value={data.notelp}/>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3">
                        <Form.Label>Admin Status :</Form.Label>
                        <Form.Select aria-label="Default select example" name='isAdmin' onChange={ChangeHandle} value={data.isAdmin}>
                            {data.isAdmin? 
                                <option value={true} defaultChecked>Yes</option> : <option value={false}>No</option>
                            }

                            {data.isAdmin? 
                                <option value={false} defaultChecked>No</option> : <option value={true}>Yes</option>
                            }
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
                    Simpan Data
                </Button>
            </Form>
        </GlobalContainer>
    )
}

export default UserEdit