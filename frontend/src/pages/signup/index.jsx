import * as React from 'react'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
import { useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import Link from '@mui/material/Link'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { signup as apiSignup } from '../../api/api.js' 

export default function Signup() {
  const navigate = useNavigate()
  const [warning, setWarning] = React.useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const username = data.get('username')?.toString().trim()
    const email = data.get('email')?.toString().trim()
    const password = data.get('password')?.toString()
    const confirm = data.get('confirm')?.toString()

    if (!username || !email || !password || !confirm) {
      setWarning('Please fill out all fields.')
      return
    }
    if (!email.includes('@')) {
      setWarning('Please enter a valid email.')
      return
    }
    if (password !== confirm) {
      setWarning('Passwords do not match.')
      return
    }
    // optional quick client-side password check (same as server)
    const pwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/
    if (!pwdRegex.test(password)) {
      setWarning('Password must be at least 6 chars and include uppercase, lowercase, number and special char.')
      return
    }

    try {
      const res = await apiSignup({ username, email, password })
      const createdUsername = res.data.user.username
      sessionStorage.setItem('username', createdUsername)
      navigate('/welcome', { state: { username: createdUsername } })
    } catch (err) {
      setWarning(err?.response?.data?.message || 'Signup failed')
    }
  }


  return (
    <Container maxWidth="sm" sx={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3, width: "100%" }}>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
          <Avatar><LockOutlinedIcon /></Avatar>
          <Typography component="h1" variant="h5">Sign Up</Typography>
        </Stack>

        {warning && <Alert severity="warning" sx={{ mb: 2 }}>{warning}</Alert>}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField margin="normal" required fullWidth name="username" label="Username" />
          <TextField margin="normal" required fullWidth name="email" label="Email" type="email" />
          <TextField margin="normal" required fullWidth name="password" label="Password" type="password" />
          <TextField margin="normal" required fullWidth name="confirm" label="Confirm Password" type="password" />

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 2 }}>
            <Button type="submit" variant="contained">Sign Up</Button>
            <Button variant="outlined" component={RouterLink} to="/">Back to Login</Button>
          </Stack>
        </Box>

        <Box mt={2} textAlign="center">
          <Typography variant="body2" color="textSecondary">
            Already have an account?{' '}
            <Link component={RouterLink} to="/" variant="body2">Login</Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  )
}
