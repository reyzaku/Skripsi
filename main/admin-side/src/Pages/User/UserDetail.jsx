import React from 'react'
import { Breadcrumb, Button, Form, Row, Col } from 'react-bootstrap'
import { GlobalContainer, Title } from '../../PreStyled'

const UserDetail = () => {
    const HandleButton = () => {

    }
    return (
        <GlobalContainer>
            <Breadcrumb>
                <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="#">User</Breadcrumb.Item>
                <Breadcrumb.Item active>User [userId]</Breadcrumb.Item>
            </Breadcrumb>
            <Title>User [userId]</Title>
            <div className="d-grid gap-2">
                <Button variant="warning" className="mb-3 px-5">Edit data</Button>
            </div>
            <Form>
                <Row>
                    <Form.Group as={Col} className="mb-3">
                        <Form.Label>Nama Depan :</Form.Label>
                        <Form.Control type="text" placeholder='Masukan Nama Depan Anda' disabled />
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3">
                        <Form.Label>Nama Belakang :</Form.Label>
                        <Form.Control type="text" placeholder='Masukan Nama Belakang Anda' disabled />
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col} className="mb-3">
                        <Form.Label>Email :</Form.Label>
                        <Form.Control type="text" placeholder='Masukan Email Anda' disabled />
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3">
                        <Form.Label>No. Handphone :</Form.Label>
                        <Form.Control type="text" placeholder='Masukan Nomor Handphone Anda' disabled />
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3">
                        <Form.Label>Admin Status :</Form.Label>
                        <Form.Select aria-label="Default select example" disabled>
                            <option>No</option>
                            <option value="1">Yes</option>
                        </Form.Select>
                    </Form.Group>
                </Row>
            </Form>
        </GlobalContainer>
    )
}

export default UserDetail