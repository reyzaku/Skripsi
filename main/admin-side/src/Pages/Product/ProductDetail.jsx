import React from 'react'
import { Breadcrumb, Button, Col, Form, Row } from 'react-bootstrap'
import styled from 'styled-components'
import { GlobalContainer, Title } from '../../PreStyled'
import image from './test.png'

const ImageContainer = styled.div`
    border: 0.5px solid lightgray;
    width: 100%;
    height: 200px;
    margin-bottom: 20px;
`

const Image = styled.img`
    height: 100%;
`

const ProductDetail = () => {
    return (
        <GlobalContainer>
            <Breadcrumb>
                <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="#">Product</Breadcrumb.Item>
                <Breadcrumb.Item active>Produk [productId]</Breadcrumb.Item>
            </Breadcrumb>
            <Title>Produk [productId]</Title>
            <div className="d-grid gap-2">
                <Button variant="warning" className="mb-3 px-5">Edit data</Button>
            </div>
            <Form>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Nama Product :</Form.Label>
                            <Form.Control type="text" placeholder='Masukan Nama Depan Anda' disabled />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Deskripsi Product :</Form.Label>
                            <Form.Control as="textarea" rows={6} placeholder='Tulis deskripsi produk' disabled />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Ukuran yang Tersedia :</Form.Label>
                            <Row>
                                <Col>
                                    <Form.Check
                                        type="checkbox"
                                        name="xl" value="XL"
                                        label="XL"
                                        disabled
                                        checked="true"
                                    />
                                    <Form.Check
                                        type="checkbox"
                                        name="l" value="L"
                                        label="L"
                                        disabled
                                        checked="false"
                                    />
                                </Col>
                                <Col>
                                    <Form.Check
                                        type="checkbox"
                                        name="m" value="M"
                                        label="M"
                                        disabled
                                    />
                                    <Form.Check
                                        type="checkbox"
                                        name="s" value="S"
                                        label="S"
                                        disabled
                                    />
                                </Col>
                            </Row>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className='mb-3'>
                            <Form.Label>Upload Gambar Product</Form.Label>
                            <ImageContainer>
                                <Image src={image} />
                            </ImageContainer>
                            <Form.Control type="file" disabled />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Form.Group as={Col} className="mb-3">
                        <Form.Label>Harga Produk :</Form.Label>
                        <Form.Control type="text" placeholder='Masukan Harga Produk' value={`Rp. `} disabled />
                        <Form.Text className='text-muted'>
                            Masukan nominal harga tanpa 'Rp.'
                        </Form.Text>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3">
                        <Form.Label>Kategori :</Form.Label>
                        <Form.Select aria-label="Default select example" disabled>
                            <option value="pria" selected>Pakaian Pria</option>
                            <option value="wanita">Pakaian Wanita</option>
                            <option value="anak">Pakaian Anak-Anak</option>

                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3">
                        <Form.Label>Status Stock :</Form.Label>
                        <Form.Select aria-label="Default select example" disabled>
                            <option value={true} selected>Tersedia</option>
                            <option value={false}>Kosong</option>
                        </Form.Select>
                    </Form.Group>
                </Row>
            </Form>
        </GlobalContainer>

    )
}

export default ProductDetail