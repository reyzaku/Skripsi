import React, { useEffect, useState } from 'react'
import { Breadcrumb, Button, Form, Row, Col, Figure } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { GlobalContainer, Title } from '../../PreStyled'
import { userRequest } from '../../reqMethod'

const UserDetail = () => {
    const [data, setData] = useState({
        username: "",
        email: "",
        notelp: "",
        firstName: "",
        lastName: "",
        isAdmin: false,
        image: null,
    })
    const {id} = useParams()

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
    return (
        <GlobalContainer>
            <Breadcrumb>
                <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="#">User</Breadcrumb.Item>
                <Breadcrumb.Item active>User [userId]</Breadcrumb.Item>
            </Breadcrumb>
            <Title>User [userId]</Title>
            <div className="d-grid gap-2">
                <Button variant="warning" className="mb-3 px-5" as={Link} to={`/user/edit/${id}`}>Edit data</Button>
            </div>
            <Form>
                <Row>
                    <Col>
                        <Figure>
                            <Form.Label>Profile Image :</Form.Label><br/>
                            <Figure.Image 
                                width={150}
                                height={150}
                                alt="171x180"
                                src={"https://picsum.photos/200"}
                            />
                        </Figure>
                    </Col>
                    <Col></Col>
                </Row>
                <Form.Group className="mb-3">
                    <Form.Label>Username :</Form.Label>
                    <Form.Control type="text" value={data.username} disabled/>
                </Form.Group>
                <Row>
                    <Form.Group as={Col} className="mb-3">
                        <Form.Label>Nama Depan :</Form.Label>
                        <Form.Control type="text" placeholder='Masukan Nama Depan Anda' value={data.firstName} disabled/>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3">
                        <Form.Label>Nama Belakang :</Form.Label>
                        <Form.Control type="text" placeholder='Masukan Nama Belakang Anda' value={data.lastName} disabled/>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col} className="mb-3">
                        <Form.Label>Email :</Form.Label>
                        <Form.Control type="text" placeholder='Masukan Email Anda' value={data.email} disabled/>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3">
                        <Form.Label>No. Handphone :</Form.Label>
                        <Form.Control type="text" placeholder='Masukan Nomor Handphone Anda' value={data.notelp} disabled/>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3">
                        <Form.Label>Admin Status :</Form.Label>
                        <Form.Select aria-label="Default select example" disabled>
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
            </Form>
        </GlobalContainer>
    )
}

export default UserDetail