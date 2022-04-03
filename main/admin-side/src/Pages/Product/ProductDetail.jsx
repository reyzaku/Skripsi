import React, { useEffect, useState } from 'react'
import { Breadcrumb, Button, Col, Form, Modal, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { GlobalContainer, Title } from '../../PreStyled'
import { userRequest } from '../../reqMethod'
import image from './test.png'
import UseAnimations from "react-useanimations";
import radioButton from 'react-useanimations/lib/checkmark'
import { Link } from 'react-router-dom'
import { convertRupiah } from '../../utils/ConvertRupiah'

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
    const [data, setData] = useState({
        title: "",
        desc: "",
        price: 0,
        category: "pria",
        image: "",
        size: [],
        inStock: false
    })
    const {id} = useParams()

    useEffect(() => {
        const getData = async () => {
            const res = await userRequest.get(`/product/find/${id}`)
            setData({
                title: res.data.title,
                desc: res.data.desc,
                price: res.data.price,
                category: res.data.category,
                image: res.data.image,
                size: res.data.size,
                inStock: res.data.inStock
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
                <Breadcrumb.Item href="#">Product</Breadcrumb.Item>
                <Breadcrumb.Item active>Produk {data.title}</Breadcrumb.Item>
            </Breadcrumb>
            <Title>Produk [productId]</Title>
            <div className="d-grid gap-2">
                <Button variant="warning" className="mb-3 px-5" as={Link} to={`/produk/edit/${id}`}>Edit data</Button>
            </div>
            <Form>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Nama Product :</Form.Label>
                            <Form.Control type="text" disabled name='title' value={data.title}/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Deskripsi Product :</Form.Label>
                            <Form.Control as="textarea" rows={6} disabled name='desc' value={data.desc}/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Ukuran yang Tersedia :</Form.Label>
                            <Form.Control type="text" name='size' value={data.size}/>
                            <Form.Text className='text-muted'>
                                Masukan ukuran dengan koma sebagai pemisah dan tanpa spasi
                            </Form.Text>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className='mb-3'>
                            <Form.Label>Upload Gambar Product</Form.Label>
                            <ImageContainer>
                                <Image name='image' src={data.image} />
                            </ImageContainer>
                            <Form.Control type="file" disabled/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Form.Group as={Col} className="mb-3">
                        <Form.Label>Harga Produk :</Form.Label>
                        <Form.Control type="text" disabled name='price' value={convertRupiah(data.price)}/>
                        <Form.Text className='text-muted'>
                            Masukan nominal harga tanpa 'Rp.'
                        </Form.Text>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3">
                        <Form.Label>Kategori :</Form.Label>
                        <Form.Select aria-label="Default select example" disabled>
                            <option value="pria" selected>Pakaian {data.category}</option>
                            <option value="wanita">Pakaian Wanita</option>
                            <option value="anak">Pakaian Anak-Anak</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3">
                        <Form.Label>Status Stock :</Form.Label>
                        <Form.Select aria-label="Default select example" disabled>
                            {data.inStock? 
                                <option value={true} defaultChecked>Tersedia</option> : <option value={false}>Kosong</option>
                            }

                            {data.isAdmin? 
                                <option value={false} defaultChecked>Kosong</option> : <option value={true}>Tersedia</option>
                            }
                        </Form.Select>
                    </Form.Group>
                </Row>
            </Form>
        </GlobalContainer>

    )
}

export default ProductDetail