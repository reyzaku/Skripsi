import React, { useState } from 'react'
import { Button, Col, Container, Form, Row, Stack } from 'react-bootstrap'
import styled from 'styled-components'
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { GlobalContainer } from '../PreStyled'

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
`

const FormContainer = styled.div`
    display: flex;
    width: 200px;
`

const Header = () => {
    const [category, setCategory] = useState("laki")

    const ChangeHandle = (event) => {
        let value = event.target.value
        let name = event.target.name
        switch (name) {
            case "category": {
                setCategory(value)
                console.log(category)
                break;
            }
            default: { break; }
        }
    }

    return (
        <GlobalContainer>
            <Wrapper>
                <Stack direction="horizontal" gap={2}>
                    <Button variant="primary" className="mr-2">Add</Button>
                    <Button variant="warning">Edit</Button>
                    <Button variant="danger">Delete</Button>
                </Stack>
                {/* <FormContainer>
                    <Form.Select name="category" onChange={ChangeHandle} value={category} autoFocus>
                        <option value="laki" defaultChecked>Laki - Laki</option>
                        <option value="perempuan">Perempuan</option>
                        <option value="anak">Anak - Anak</option>
                    </Form.Select>
                </FormContainer> */}
                <FormContainer>
                    <Form.Control type="text" placeholder="Cari data" />
                    <Button variant="dark">
                        <SearchIcon/>
                    </Button>
                </FormContainer>
            </Wrapper>

            {/* <Container fluid>
                <Row>
                    <Col style={{textAlign: "left"}}>
                        <Form.Control type="text" placeholder="Search Here" />
                    </Col>
                    <Col style={{textAlign: "right"}}> column 2 </Col>
                </Row>
            </Container> */}
        </GlobalContainer>
    )
}

export default Header