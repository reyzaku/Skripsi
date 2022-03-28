import React, { useState } from 'react'
import { Button, Form, Stack } from 'react-bootstrap'
import styled from 'styled-components'
import SearchIcon from '@mui/icons-material/Search';

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
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
        <Wrapper>
            <Stack direction="horizontal" gap={2}>
                <Button variant="primary" className="w-100">Tambah Data</Button>
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
                    <SearchIcon />
                </Button>
            </FormContainer>
        </Wrapper>
    )
}

export default Header