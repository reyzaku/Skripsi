import React from 'react'
import { Breadcrumb, Button, Form, Col, Row } from 'react-bootstrap'
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
const ProductForm = () => {
    const HandleButton = () => {

    }
    return (
        <GlobalContainer>
            <Breadcrumb>
                <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="#">Product</Breadcrumb.Item>
                <Breadcrumb.Item active>Add Product</Breadcrumb.Item>
            </Breadcrumb>
            <Title>Tambah Product Baru</Title>
            <Form>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Nama Product :</Form.Label>
                            <Form.Control type="text" placeholder='Masukan Nama Depan Anda' />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Deskripsi Product :</Form.Label>
                            <Form.Control as="textarea" rows={6} placeholder='Tulis deskripsi produk' />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Ukuran yang Tersedia :</Form.Label>
                            <Row>
                                <Col>
                                    <Form.Check
                                        type="checkbox"
                                        name="xl" value="XL"
                                        label="XL"
                                    />
                                    <Form.Check
                                        type="checkbox"
                                        name="l" value="L"
                                        label="L"
                                    />
                                </Col>
                                <Col>
                                    <Form.Check
                                        type="checkbox"
                                        name="m" value="M"
                                        label="M"
                                    />
                                    <Form.Check
                                        type="checkbox"
                                        name="s" value="S"
                                        label="S"
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
                            <Form.Control type="file" />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Form.Group as={Col} className="mb-3">
                        <Form.Label>Harga Produk :</Form.Label>
                        <Form.Control type="text" placeholder='Masukan Email Anda' />
                        <Form.Text className='text-muted'>
                            Masukan nominal harga tanpa 'Rp.'
                        </Form.Text>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3">
                        <Form.Label>Kategori :</Form.Label>
                        <Form.Select aria-label="Default select example">
                            <option value="pria" selected>Pakaian Pria</option>
                            <option value="wanita">Pakaian Wanita</option>
                            <option value="anak">Pakaian Anak-Anak</option>

                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3">
                        <Form.Label>Status Stock :</Form.Label>
                        <Form.Select aria-label="Default select example">
                            <option value={true} selected>Tersedia</option>
                            <option value={false}>Kosong</option>
                        </Form.Select>
                    </Form.Group>
                </Row>
                <Button
                    variant='dark'
                    style={{ width: "100%", marginTop: "10px" }}
                    onClick={HandleButton}>
                    Tambah Produk Baru
                </Button>
            </Form>
        </GlobalContainer>
    )
}

export default ProductForm