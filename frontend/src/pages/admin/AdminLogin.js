import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import styled from 'styled-components';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
    
        if (!email || !password) {
            setError('Please fill in all fields.');
            return;
        }
    
        try {
            const response = await fetch('http://localhost:5000/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
    
            const data = await response.json();
    
            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }
    
            // Store token and redirect
            localStorage.setItem('adminToken', data.token);
            window.location.href = '/admin/AdminDashboard'; // Redirect to the admin panel
        } catch (err) {
            setError(err.message);
        }
    };
    

    return (
        <StyledContainer>
            <StyledPaper elevation={3}>
                <StyledTitle>
                    Admin Login
                </StyledTitle>
                <StyledText>
                    Please enter your email and password to access the admin dashboard.
                </StyledText>
                <form onSubmit={handleSubmit}>
                    <StyledBox>
                        <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            sx={{ marginBottom: '16px' }}
                            required
                        />
                        <TextField
                            label="Password"
                            variant="outlined"
                            fullWidth
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            sx={{ marginBottom: '24px' }}
                            required
                        />
                        {error && (
                            <Typography color="error" sx={{ marginBottom: '16px' }}>
                                {error}
                            </Typography>
                        )}
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{
                                backgroundColor: '#7c4dff',
                                color: 'white',
                                padding: '10px 20px',
                                fontSize: '1rem',
                                fontWeight: '600',
                                textTransform: 'none',
                                '&:hover': {
                                    backgroundColor: '#6a1b9a',
                                },
                            }}
                        >
                            Login
                        </Button>
                    </StyledBox>
                </form>
            </StyledPaper>
        </StyledContainer>
    );
};

export default AdminLogin;

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
`;

const StyledPaper = styled.div`
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  max-width: 500px;
  width: 100%;
`;

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  width: 100%;
`;

const StyledTitle = styled(Typography)`
  font-size: 2rem;
  color: #252525;
  font-weight: 800;
  text-align: center;
  margin-bottom: 24px;
  line-height: 1.2;
  background: linear-gradient(135deg, #7c4dff, #3a1c71);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const StyledText = styled(Typography)`
  color: #555;
  font-size: 1rem;
  text-align: center;
  margin-bottom: 32px;
  line-height: 1.6;
`;