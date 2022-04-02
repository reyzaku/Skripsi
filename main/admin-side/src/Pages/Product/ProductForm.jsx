import axios from 'axios'
import React, { useState } from 'react'
import { Breadcrumb, Button, Form, Col, Row } from 'react-bootstrap'
import styled from 'styled-components'
import { GlobalContainer, Title } from '../../PreStyled'
import { publicRequest } from '../../reqMethod'
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
    const [input, setInput] = useState({
        title: "",
        desc: "",
        price: 0,
        category: "pria",
        image: "",
        size: [],
        inStock: false
    })

    const HandleButton = (event) => {
        event.preventDefault()
        publicRequest.post("/product", input).then(

        ).catch(

        )
    }

    const ChangeHandle = (event) => {
        let value = event.target.value
        let name = event.target.name
        console.log(input)
        switch(name) {
            case "title": {
                setInput({...input, title: value})
                break; 
            }
            case "desc": {
                setInput({...input, desc: value})
                break; 
            }
            case "price": {
                setInput({...input, price: value})
                break; 
            }
            case "category": {
                setInput({...input, category: value})
                break;
            }
            case "size": {
                setInput({...input, size: [value.slice(",")]})
                break;
            }
            case "stock": {
                setInput({...input, inStock: value})
                break;
            }
        }
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
                            <Form.Control type="text" placeholder='Masukan Nama Depan Anda' name='title' onChange={ChangeHandle} value={input.title}/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Deskripsi Product :</Form.Label>
                            <Form.Control as="textarea" rows={6} placeholder='Tulis deskripsi produk' name='desc' onChange={ChangeHandle} value={input.desc}/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Ukuran yang Tersedia :</Form.Label>
                            <Form.Control type="text" placeholder='Masukan Size yang tersedia' name='size' onChange={ChangeHandle} value={input.size}/>
                            <Form.Text className='text-muted'>
                                Masukan ukuran dengan koma sebagai pemisah dan tanpa spasi
                            </Form.Text>
                            {/* <Row>
                                <Col>
                                    <Form.Check
                                        type="checkbox"
                                        name="xl" value="XL"
                                        label="XL"
                                        onChange={e => setInput(...input.size, e.target.value)}
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
                            </Row> */}
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className='mb-3'>
                            <Form.Label>Upload Gambar Product</Form.Label>
                            <ImageContainer>
                                <Image src={image} />
                            </ImageContainer>
                            <Form.Control type="file" accept="image/png, image/jpeg"/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Form.Group as={Col} className="mb-3">
                        <Form.Label>Harga Produk :</Form.Label>
                        <Form.Control type="number" placeholder='Masukan Harga Produk' value={input.price}  name='price' onChange={ChangeHandle}/>
                        <Form.Text className='text-muted'>
                            Masukan nominal harga tanpa 'Rp.'
                        </Form.Text>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3">
                        <Form.Label>Kategori :</Form.Label>
                        <Form.Select aria-label="Default select example"  name='category' onChange={ChangeHandle}>
                            <option value="pria" defaultValue>Pakaian Pria</option>
                            <option value="wanita">Pakaian Wanita</option>
                            <option value="anak">Pakaian Anak-Anak</option>

                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3">
                        <Form.Label>Status Stock :</Form.Label>
                        <Form.Select aria-label="Default select example"  name='stock' onChange={ChangeHandle}>
                            <option value={false} defaultValue>Kosong</option>
                            <option value={true}>Tersedia</option>
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