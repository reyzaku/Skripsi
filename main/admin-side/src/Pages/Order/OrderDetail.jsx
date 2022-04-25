import React, { useEffect, useState } from 'react'
import { Breadcrumb, Button, Form, Row, Col, Container, Card, Modal } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { format } from 'timeago.js'
import { GlobalContainer, Title } from '../../PreStyled'
import { userRequest } from '../../reqMethod'
import { convertRupiah } from '../../utils/ConvertRupiah'

// const Title = styled.h3`
//     color: black;
// `

const OrderDetail = () => {
    const [data, setData] = useState({
        id: "",
        invoiceId: "",
        status: "",
        amount: 0,
        paymentUrl: "",
        name: "",
        phone: "",
        email: "",
        address: "",
        createdAt: "",
        updatedAt: "",
        products: [],
        resi: ""
    })

    const [payload, setPayload] = useState({
        resi: ""
    })
    const [show, setShow] = useState(false)
    const {id} = useParams()
    const [restart, setRestart] = useState(false)

    useEffect(() => {
        const getData = async () => {
            const res = await userRequest.get(`/order/${id}`)
            setData({
                id: res.data._id,
                invoiceId: res.data.invoiceId,
                status: res.data.status,
                amount: res.data.gross_amount,
                paymentUrl: res.data.redirect_url,
                name: res.data.name,
                phone: res.data.phone,
                email: res.data.email,
                address: res.data.address,
                createdAt: res.data.createdAt,
                updatedAt: res.data.updatedAt,
                products: res.data.products,
                resi: res.data.resi
            })
            console.log(res.data)
        }
        getData()
        console.log(data)
    }, [setRestart, restart])

    const CheckPayment = () => {
        setRestart(!restart)
    }

    const ModalShow = () => {
        setShow(true)
    }

    const UpdateResi = (event) => {
        event.preventDefault()
        try {
            userRequest.put(`/order/${data.id}`, payload)
            window.alert("Data Berhasil Di Update")
            setRestart(!restart)
            setShow(false)
        }catch{
            window.alert("Data Gagal Di Update")
            setRestart(!restart)
            setShow(false)
        }
    }



    return (
        <GlobalContainer>
            <Breadcrumb>
                <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="#">Order</Breadcrumb.Item>
                <Breadcrumb.Item active>{data.invoiceId}</Breadcrumb.Item>
            </Breadcrumb>
            <Modal
                show={show}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header>
                    <Modal.Title>Update Resi</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container className='mx-auto'>
                        <Form.Group as={Col} className="mb-3">
                            <Form.Label>No. Resi :</Form.Label>
                            <Form.Control type="text" onChange={(e) => setPayload({...payload, resi: e.target.value})}/>
                        </Form.Group>

                    </Container>
                    <Container className='mx-auto'>
                        <Button variant="primary" onClick={UpdateResi}>Update</Button>
                    </Container>
                </Modal.Body>
            </Modal>
            <Title>Detail {data.invoiceId}</Title>
            <div className="d-grid gap-2">
                <Button variant="warning" className="mb-3 px-5" onClick={ModalShow}>Update Resi</Button>
            </div>

            <Form>
                <Row>
                    <Col>
                        <Row>
                            <Form.Group as={Col} className="mb-3">
                                <Form.Label>Status Transaksi :</Form.Label>
                                <h3 style={{ color: "#0d6efd" }}>{data.status}</h3>
                                {/* <h3 style={{ color: "#ffc107" }}>Pending</h3>
                                <h3 style={{ color: "#dc3545" }}>Cancel</h3> */}
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3">
                                <Form.Label>No. Resi :</Form.Label>
                                <Form.Control type="text" disabled value={data.resi} />
                            </Form.Group>

                        </Row>
                        <Row>
                            <Form.Group as={Col} className="mb-3">
                                <Form.Label>No. Invoice :</Form.Label>
                                <Form.Control type="text" disabled value={data.invoiceId} />
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3">
                                <Form.Label>Tanggal Pesanan :</Form.Label>
                                <Form.Control type="text" disabled value={data.createdAt.split("T")[0]}/>
                            </Form.Group>
                        </Row>

                        <Form.Group className="mb-3">
                            <Form.Label>Total Transaksi :</Form.Label>
                            <Form.Control type="text" disabled value={convertRupiah(data.amount)}/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Nama Penerima :</Form.Label>
                            <Form.Control type="text" disabled value={data.name}/>
                        </Form.Group>
                        <Row>
                            <Form.Group as={Col} className="mb-3">
                                <Form.Label>No. Handphone Penerima :</Form.Label>
                                <Form.Control type="text" disabled value={data.phone}/>
                            </Form.Group>

                            <Form.Group as={Col} className="mb-3">
                                <Form.Label>Email Penerima :</Form.Label>
                                <Form.Control type="text" disabled value={data.email}/>
                            </Form.Group>
                        </Row>
                        <Form.Group className="mb-3">
                            <Form.Label>Alamat Penerima :</Form.Label>
                            <Form.Control as="textarea" rows={6} disabled value={data.address}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Payment Link :</Form.Label>
                        </Form.Group>
                        <Button variant="primary" onClick={CheckPayment}>Cek Payment</Button>
                    </Col>
                    <Col>
                        <Container>
                            <Form.Label>Products :</Form.Label>
                            {data.products.map((product, index) => (
                                <Card key={index + 1} className="mb-2">
                                    <Card.Img variant="top" src={product.image} />
                                    <Card.Body>
                                        <Card.Title>{product.title}</Card.Title>
                                        <Card.Text>
                                            Ukuran: {product.size} <br/>
                                            Jumlah: {product.quantity}
                                        </Card.Text>
                                        <Card.Text>
                                            {convertRupiah(product.price)}
                                        </Card.Text>
                                    </Card.Body>
                                </Card> 
                            ))}
                        </Container>
                    </Col>
                </Row>
            </Form>
        </GlobalContainer>
    )
}

export default OrderDetail