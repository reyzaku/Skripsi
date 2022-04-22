import React, { useEffect, useState } from 'react'
import { Breadcrumb, Button, Form, Col, Row, Modal, Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
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

const ProductEdit = () => {
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
    const [show, setShow] = useState({
        sucess: false,
        error: false
    })
    const [file, setFile] = useState(null)

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

    const HandleButton = (event) => {
        event.preventDefault()
        userRequest.put(`/product/${id}`, data).then(()=>{
            setShow({...show, sucess: true})
        }).catch(
            setShow({...show, error: true})
        )
    }

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
                    setData({...data, image: downloadURL})
                    console.log('File available at', downloadURL);
                });
            }
            );
        }

    }

    const ChangeHandle = (event) => {
        let value = event.target.value
        let name = event.target.name
        switch(name) {
            case "title": {
                setData({...data, title: value})
                break; 
            }
            case "desc": {
                setData({...data, desc: value})
                break; 
            }
            case "price": {
                setData({...data, price: value})
                break; 
            }
            case "category": {
                setData({...data, category: value})
                break;
            }
            case "size": {
                setData({...data, size: [value.slice(",")]})
                break;
            }
            case "stock": {
                setData({...data, inStock: value})
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
                <Breadcrumb.Item active>Edit Product</Breadcrumb.Item>
            </Breadcrumb>
            <Title>Ubah Data [productId]</Title>
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
                        <h4 className='my-5 mx-2'>Produk Telah Diupdate</h4>
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
                        <h4 className='my-5 mx-2'>Produk gagal diupdate</h4>
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
                            <Form.Control type="text" placeholder='Masukan Nama Depan Anda' name='title' onChange={ChangeHandle} value={data.title}/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Deskripsi Product :</Form.Label>
                            <Form.Control as="textarea" rows={6} placeholder='Tulis deskripsi produk' name='desc' onChange={ChangeHandle} value={data.desc}/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Ukuran yang Tersedia :</Form.Label>
                            <Form.Control type="text" placeholder='Masukan Size yang tersedia' name='size' onChange={ChangeHandle} value={data.size}/>
                            <Form.Text className='text-muted'>
                                Masukan ukuran dengan koma sebagai pemisah dan tanpa spasi
                            </Form.Text>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className='mb-3'>
                            <Form.Label>Upload Gambar Product</Form.Label>
                            <ImageContainer>
                                <Image src={data.image} />
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
                        <Form.Control type="number" placeholder='Masukan Harga Produk' value={data.price}  name='price' onChange={ChangeHandle}/>
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
                            {data.inStock? 
                                <option value={true} defaultChecked>Tersedia</option> : <option value={false}>Kosong</option>
                            }

                            {data.inStock? 
                                <option value={false} defaultChecked>Kosong</option> : <option value={true}>Tersedia</option>
                            }
                        </Form.Select>
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

export default ProductEdit