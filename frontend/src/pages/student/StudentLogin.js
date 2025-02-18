import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const StudentLogin = () => {
    const [rollNum, setRollNum] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!rollNum || !password) {
            setError('Please fill in all fields.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/student/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ rollNum, password }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Login failed');

            localStorage.setItem('studentToken', data.token);
            localStorage.setItem('rollNum', rollNum);

            navigate(`/student/StudentDashboard/${rollNum}`);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <StyledContainer>
            <StyledPaper>
                <StyledTitle>Student Login</StyledTitle>
                <StyledText>Please enter your Roll Number and Password to access the student dashboard.</StyledText>
                <form onSubmit={handleSubmit}>
                    <StyledBox>
                        <TextField
                            label="Roll Number"
                            variant="outlined"
                            fullWidth
                            type="number"
                            value={rollNum}
                            onChange={(e) => setRollNum(e.target.value)}
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
                        {error && <Typography color="error">{error}</Typography>}
                        <Button type="submit" variant="contained" fullWidth sx={{ backgroundColor: '#7c4dff' }}>
                            Login
                        </Button>
                    </StyledBox>
                </form>
            </StyledPaper>
        </StyledContainer>
    );
};

export default StudentLogin;

// Styled Components
const StyledContainer = styled(Container)` display: flex; justify-content: center; align-items: center; height: 100vh; background: linear-gradient(135deg, #f5f7fa, #c3cfe2); `;
const StyledPaper = styled.div` padding: 40px; display: flex; flex-direction: column; align-items: center; background: white; border-radius: 16px; max-width: 500px; `;
const StyledBox = styled(Box)` display: flex; flex-direction: column; align-items: center; gap: 16px; width: 100%; `;
const StyledTitle = styled(Typography)` font-size: 2rem; font-weight: 800; background: linear-gradient(135deg, #7c4dff, #3a1c71); -webkit-background-clip: text; -webkit-text-fill-color: transparent; `;
const StyledText = styled(Typography)` color: #555; font-size: 1rem; text-align: center; `;
