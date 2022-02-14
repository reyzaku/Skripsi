import React from 'react'
import styled from 'styled-components'
import { Categories } from '../data'
import CatalogButton from './CatalogButton'

const Container = styled.div `
    display: flex;
    padding: 20px;
    justify-content: space-between;
    margin: auto 50px ;
`

const Catalog = () => {
    return (
        <Container>
            {Categories.map(item=>(
                <CatalogButton item={item} key={item.id}/>
            ))}
        </Container>
    )
}

export default Catalog
