import React from 'react'
import { GlobalContainer } from '../PreStyled'
import Table from 'react-bootstrap/Table'

const Tables = () => {
    const Order = [
        {column: "No", key: 0},
        {column: "Order Id", key: 1},
        {column: "Nama", key: 1},
        {column: "Total Harga", key: 1},
        {column: "Tanggal", key: 1},
        {column: "Action", key: 1}
    ]

    return (
        <GlobalContainer>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        {Order.map(({key, column}) =>(
                            <th key={key}>{column}</th>
                        ))}
                        
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Larry the Bird</td>
                        <td>Bird</td>
                        <td>@twitter</td>
                    </tr>
                </tbody>
            </Table>
        </GlobalContainer>
    )
}

export default Tables