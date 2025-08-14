import * as React from 'react'
import Container from '@mui/material/Container'
import ButtonAppBar from './components/ButtonAppBar'
import Approute from './routes/AppRoute'

export default function App() {
  return (
    <>
      <ButtonAppBar />
      <Container sx={{ py: 4 }}>
        <Approute />
      </Container>
    </>
  )
}