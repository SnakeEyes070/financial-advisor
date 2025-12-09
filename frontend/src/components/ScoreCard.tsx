import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

interface ScoreCardProps {
    score: number;
}

const getColor = (score: number) => {
    if (score < 30) return '#d32f2f'; // Red
    if (score < 60) return '#ed6c02'; // Orange
    if (score < 80) return '#0288d1'; // Blue
    return '#2e7d32'; // Green
};

const ScoreCard: React.FC<ScoreCardProps> = ({ score }) => {
    return (
        <Paper elevation={3} sx={{
            p: 4,
            textAlign: 'center',
            borderRadius: '50%',
            width: 200,
            height: 200,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            background: `conic-gradient(${getColor(score)} ${score}%, #e0e0e0 ${score}% 100%)`, // Simple gauge effect
            margin: '0 auto'
        }}>
            <Box sx={{
                background: 'white',
                borderRadius: '50%',
                width: 160,
                height: 160,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Typography variant="h2" component="div" sx={{ fontWeight: 'bold', color: getColor(score) }}>
                    {score}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    Stability Score
                </Typography>
            </Box>
        </Paper>
    );
};

export default ScoreCard;
