import * as React from 'react'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
import { useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import Link from '@mui/material/Link'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { login as apiLogin } from '../../api/api.js'

export default function Login() {
  const navigate = useNavigate()
  const [warning, setWarning] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const identifier = (data.get('identifier') || '').toString().trim()
    const password = (data.get('password') || '').toString()

    if (!identifier || !password) {
      setWarning('Please enter Email/Username and Password.')
      return
    }

    try {
      const res = await apiLogin({ identifier, password })
      const username = res.data.user.username
      sessionStorage.setItem('username', username)
      navigate('/welcome', { state: { username } })
    } catch (err) {
      // prefer server message, otherwise fallback
      setWarning(err?.response?.data?.message || 'Login failed')
    }
  }


  return (
    <Container maxWidth="sm"   sx={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3, width: "100%" }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Avatar><LockOutlinedIcon /></Avatar>
            <Typography component="h1" variant="h5">Login</Typography>
          </Stack>
        </Stack>

        {warning && <Alert severity="warning" sx={{ mb: 2 }}>{warning}</Alert>}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField margin="normal"
            required
            fullWidth
            id="identifier"
            label="Email or Username"
            name="identifier"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
          />
          <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 2 }}>
            <Button type="submit" variant="contained">Login</Button>
            <Button variant="outlined" component={RouterLink} to="/signup">Sign Up</Button>
          </Stack>
          <Box mt={2}>
            <Link component={RouterLink} to="/forgot-password" variant="body2">
              Forgot password?
            </Link>
          </Box>
        </Box>
        <Box mt={2} textAlign="center">
          <Typography variant="body2" color="textSecondary">
            {'Don\'t have an account? '}
            <Link component={RouterLink} to="/signup" variant="body2">
              Sign Up
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  )
}