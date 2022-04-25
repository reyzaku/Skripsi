import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Breadcrumb, Button, Form, Col, Row, Modal, Container } from 'react-bootstrap'
import styled from 'styled-components'
import { GlobalContainer, Title } from '../../PreStyled'
import { userRequest } from '../../reqMethod'
import image from './test.png'
import UseAnimations from "react-useanimations";
import radioButton from 'react-useanimations/lib/checkmark'
import { Link } from 'react-router-dom'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../../firebase'


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

    const [show, setShow] = useState({
        sucess: false,
        error: false
    })

    const [file, setFile] = useState(null)

    const UploadImage = () => { 
        if(file === null) {
            console.log("File Kosong!")
        }else {
            const fileName = new Date().getTime() + file.name;
            const storage = getStorage(app);
            const storageRef = ref(storage, fileName)
    
            const uploadTask = uploadBytesResumable(storageRef, file);
            // Register three observers:
            // 1. 'state_changed' observer, called any time the state changes
            // 2. Error observer, called on failure
            // 3. Completion observer, called on successful completion
            uploadTask.on('state_changed',
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                    break;
                default: 
                    break;
                }
                
            },
            (error) => {
                // Handle unsuccessful uploads
            },
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setInput({...input, image: downloadURL})
                    console.log('File available at', downloadURL);
                });
            }
            );
        }

    }

    const HandleButton = async (event) => {
        event.preventDefault()
        await userRequest.post("/product", input).then(()=>{
            setShow({...show, sucess: true})
        }).catch(
            setShow({...show, error: true})
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
            // case "image": {
            //     setFile(event.target.files)
            //     // const fileName = new Date().getTime() + file.name;
            //     console.log(file)
            // }
            default: {
                break;
            }
        }
    }

    const CloseModal = () => {
        setShow({...show, error: false})
    }

    return (
        <GlobalContainer>
            <Breadcrumb>
                <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="#">Product</Breadcrumb.Item>
                <Breadcrumb.Item active>Add Product</Breadcrumb.Item>
            </Breadcrumb>
            <Title>Tambah Product Baru</Title>
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
                        <h4 className='my-5 mx-2'>Produk Baru Telah Dibuat</h4>
                        <UseAnimations animation={radioButton} autoPlay={true} size={50}/>
                    </Container>
                    <Container className='d-flex justify-content-center'>
                        <Button variant="primary" as={Link} to={`/produk`}>Understood</Button>
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
                        <h4 className='my-5 mx-2'>Produk Baru gagal dibuat</h4>
                        <UseAnimations animation={radioButton} autoPlay={true} size={50}/>
                    </Container>
                    <Container className='d-flex justify-content-center'>
                        <Button variant="danger" onClick={CloseModal}>Understood</Button>
                    </Container>
                </Modal.Body>
            </Modal>
            <Form>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Nama Product :</Form.Label>
                            <Form.Control type="text" placeholder='Masukan Nama Produk' name='title' onChange={ChangeHandle} value={input.title}/>
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
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className='mb-3'>
                            <Form.Label>Upload Gambar Product</Form.Label>
                            <ImageContainer>
                                <Image src={input.image} />
                            </ImageContainer>
                            <Form.Control type="file" accept="image/png, image/jpeg, image/jpg" name='image' onChange={(e) => setFile(e.target.files[0])}/>
                            <Button
                                className='mt-3'
                                variant='dark'
                                onClick={UploadImage}>
                                Upload Gambar
                            </Button>
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