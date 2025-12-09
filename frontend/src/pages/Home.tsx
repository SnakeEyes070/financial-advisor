import React from 'react';
import { Container, Typography, Button, Box, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CalculateIcon from '@mui/icons-material/Calculate';

const Home: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Container maxWidth="md" sx={{ mt: 8, textAlign: 'center' }}>
            <Paper elevation={3} sx={{ p: 6, borderRadius: 4 }}>
                <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                    Financial Stability Advisor
                </Typography>
                <Typography variant="h5" color="text.secondary" paragraph>
                    Get a personalized AI-powered assessment of your financial health.
                    Understand your risks, get stability scores, and receive actionable advice in seconds.
                </Typography>
                <Box mt={4}>
                    <Button
                        variant="contained"
                        size="large"
                        startIcon={<CalculateIcon />}
                        onClick={() => navigate('/input')}
                        sx={{ fontSize: '1.2rem', py: 1.5, px: 4, borderRadius: 2 }}
                    >
                        Start Analysis
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default Home;
