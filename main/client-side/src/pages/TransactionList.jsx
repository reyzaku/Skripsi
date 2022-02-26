import React from 'react'
import styled from 'styled-components'
import Navbar from '../component/Navbar'

const Container = styled.div``
const TransactionCard = styled.div``
const TransactionTitle = styled.div``
const TransactionTotal = styled.div``
const TransactionStatus = styled.div``
const Status = styled.div``
const Button = styled.div``


const TransactionList = () => {
    return (
        <div>
            <Navbar/>
            <Container>
                <TransactionCard>
                    <TransactionTitle></TransactionTitle>
                    <TransactionTotal></TransactionTotal>
                    <TransactionStatus>
                        <Status></Status>
                    </TransactionStatus>
                    <Button></Button>
                </TransactionCard>
            </Container>
        </div>
    )
}

export default TransactionList