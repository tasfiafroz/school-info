import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Box, Button } from '@mui/material';
import styled from 'styled-components';
import sc from "../assets/sc.jpg";

const Homepage = () => {
    return (
        <StyledContainer>
            <Grid container spacing={0}>
                <Grid item xs={12} md={6}>
                    <img src={sc} alt="students" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <StyledPaper elevation={3}>
                        <StyledTitle>
                            CUET School
                            <br />
                            Information Management
                            <br />
                            System
                        </StyledTitle>
                        <StyledText>
                            Dedicated to building your child’s capacity to change the world through fostering a love of learning.
                        </StyledText>
                        <StyledBox>
                            <StyledLink to="/choose">
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
                                        '&:hover': {
                                            backgroundColor: '#6a1b9a',
                                        },
                                    }}
                                >
                                    Login
                                </Button>
                            </StyledLink>
                            <StyledText>
                                Visit as{' '}
                                <Link to="/Home" style={{ color: "#7c4dff", fontWeight: "bold" }}>
                                    Guest
                                </Link>
                            </StyledText>
                        </StyledBox>
                    </StyledPaper>
                </Grid>
            </Grid>
        </StyledContainer>
    );
};

export default Homepage;

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
`;

const StyledPaper = styled.div`
  padding: 40px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  padding: 24px;
  width: 100%;
  max-width: 400px;
`;

const StyledTitle = styled.h1`
  font-size: 3rem;
  color: #252525;
  font-weight: 800;
  text-align: center;
  margin-bottom: 24px;
  line-height: 1.2;
  background: linear-gradient(135deg, #7c4dff, #3a1c71);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const StyledText = styled.p`
  color: #555;
  font-size: 1.1rem;
  text-align: center;
  margin-top: 16px;
  margin-bottom: 32px;
  line-height: 1.6;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  width: 100%;
`;