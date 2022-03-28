import React from 'react'
import { Breadcrumb, Form, Row, Col, Button } from 'react-bootstrap'
import { GlobalContainer, Title } from '../../PreStyled'

const UserEdit = () => {
    const HandleButton = () => {

    }
    return (
        <GlobalContainer>
            <Breadcrumb>
                <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="#">User</Breadcrumb.Item>
                <Breadcrumb.Item active>Edit User [userId]</Breadcrumb.Item>
            </Breadcrumb>
            <Title>Edit User [userId]</Title>
            <Form>
                <Row>
                    <Form.Group as={Col} className="mb-3">
                        <Form.Label>Nama Depan :</Form.Label>
                        <Form.Control type="text" placeholder='Masukan Nama Depan Anda' />
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3">
                        <Form.Label>Nama Belakang :</Form.Label>
                        <Form.Control type="text" placeholder='Masukan Nama Belakang Anda' />
                    </Form.Group>
                </Row>
                <Form.Group className="mb-3">
                    <Form.Label>Password :</Form.Label>
                    <Form.Control type="password" placeholder='Masukan Password Anda' />
                </Form.Group>
                <Row>
                    <Form.Group as={Col} className="mb-3">
                        <Form.Label>Email :</Form.Label>
                        <Form.Control type="text" placeholder='Masukan Email Anda' />
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3">
                        <Form.Label>No. Handphone :</Form.Label>
                        <Form.Control type="text" placeholder='Masukan Nomor Handphone Anda' />
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3">
                        <Form.Label>Admin Status :</Form.Label>
                        <Form.Select aria-label="Default select example">
                            <option>No</option>
                            <option value="1">Yes</option>
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