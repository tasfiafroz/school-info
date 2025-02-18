import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Box, Button, Typography } from '@mui/material';
import styled from 'styled-components';

const Choose = () => {
    return (
        <StyledContainer>
            <StyledPaper elevation={3}>
                <StyledTitle>
                    Choose Your Role
                </StyledTitle>
                <StyledText>
                    Please select your role to proceed to the login page.
                </StyledText>
                <StyledBox>
                    <StyledLink to="/admin/AdminLogin">
                        <Button
                            variant="contained"
                            fullWidth
                            sx={{
                                backgroundColor: '#7c4dff',
                                color: 'white',
                                padding: '10px 20px',
                                fontSize: '1rem',
                                fontWeight: '600',
                                textTransform: 'none',
                                marginBottom: '16px',
                                '&:hover': {
                                    backgroundColor: '#6a1b9a',
                                },
                            }}
                        >
                            Login as Admin
                        </Button>
                    </StyledLink>
                    <StyledLink to="/student/StudentLogin">
                        <Button
                            variant="contained"
                            fullWidth
                            sx={{
                                backgroundColor: '#7c4dff',
                                color: 'white',
                                padding: '10px 20px',
                                fontSize: '1rem',
                                fontWeight: '600',
                                textTransform: 'none',
                                marginBottom: '16px',
                                '&:hover': {
                                    backgroundColor: '#6a1b9a',
                                },
                            }}
                        >
                            Login as Student
                        </Button>
                    </StyledLink>
                    <StyledLink to="/teacher/TeacherLogin">
                        <Button
                            variant="contained"
                            fullWidth
                            sx={{
                                backgroundColor: '#7c4dff',
                                color: 'white',
                                padding: '10px 20px',
                                fontSize: '1rem',
                                fontWeight: '600',
                                textTransform: 'none',
                                marginBottom: '16px',
                                '&:hover': {
                                    backgroundColor: '#6a1b9a',
                                },
                            }}
                        >
                            Login as Teacher
                        </Button>
                    </StyledLink>
                </StyledBox>
            </StyledPaper>
        </StyledContainer>
    );
};

export default Choose;

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

const StyledLink = styled(Link)`
  text-decoration: none;
  width: 100%;
`;