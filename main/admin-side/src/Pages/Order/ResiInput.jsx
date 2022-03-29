import React from 'react'
import { Breadcrumb, Button, Form, Row, Col, Container, Card } from 'react-bootstrap'
import { GlobalContainer, Title } from '../../PreStyled'

const ResiInput = () => {
    return (
        <GlobalContainer>
            <Breadcrumb>
                <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="#">Order</Breadcrumb.Item>
                <Breadcrumb.Item active>Order [orderId]</Breadcrumb.Item>
            </Breadcrumb>
            <Title>Update Resi [orderId]</Title>
            <div className="d-grid gap-2">
                <Button variant="warning" className="mb-3 px-5">Input Resi</Button>
            </div>
            <Form>
                <Row>
                    <Col>
                        <Row>
                            <Form.Group as={Col} className="mb-3">
                                <Form.Label>No. Invoice :</Form.Label>
                                <Form.Control type="text" disabled />
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3">
                                <Form.Label>Tanggal Pesanan :</Form.Label>
                                <Form.Control type="text" disabled />
                            </Form.Group>
                        </Row>

                        <Form.Group className="mb-3">
                            <Form.Label>Total Transaksi :</Form.Label>
                            <Form.Control type="text" disabled />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Nama Penerima :</Form.Label>
                            <Form.Control type="text" disabled />
                        </Form.Group>
                        <Row>
                            <Form.Group as={Col} className="mb-3">
                                <Form.Label>No. Handphone Penerima :</Form.Label>
                                <Form.Control type="text" disabled />
                            </Form.Group>

                            <Form.Group as={Col} className="mb-3">
                                <Form.Label>Email Penerima :</Form.Label>
                                <Form.Control type="text" disabled />
                            </Form.Group>
                        </Row>
                        <Form.Group className="mb-3">
                            <Form.Label>Alamat Penerima :</Form.Label>
                            <Form.Control as="textarea" rows={6} disabled />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Payment Link :</Form.Label>
                        </Form.Group>
                        <Button variant="primary">Cek Payment</Button>
                    </Col>
                    <Col>
                        <Container>
                            <Card>
                                <Card.Img variant="top" src="holder.js/100px180" />
                                <Card.Body>
                                    <Card.Title>[Item_Title]</Card.Title>
                                    <Card.Text>
                                        Ukuran: [ukuran] Jumlah: [Jumlah]
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Container>
                    </Col>
                </Row>
            </Form>
        </GlobalContainer>
    )
}

export default ResiInput