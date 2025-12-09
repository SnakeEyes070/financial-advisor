import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Grid, Typography, Button, Box, CircularProgress, Paper } from '@mui/material';
import { analyzeFinances } from '../services/api';
import { AnalysisResult, FinancialInput } from '../types/financial';
import ScoreCard from '../components/ScoreCard';
import RiskBadge from '../components/RiskBadge';
import FinancialChart from '../components/FinancialChart';

const Results: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const financialData = location.state?.financialData as FinancialInput;
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!financialData) {
            navigate('/');
            return;
        }

        const fetchAnalysis = async () => {
            try {
                const data = await analyzeFinances(financialData);
                setResult(data);
            } catch (error) {
                console.error("Analysis failed", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAnalysis();
    }, [financialData, navigate]);

    if (loading) return <Box display="flex" justifyContent="center" mt={10}><CircularProgress /></Box>;
    if (!result) return <Typography>Error loading results.</Typography>;

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h3" align="center" gutterBottom>Financial Wellness Report</Typography>

                <Box display="flex" justifyContent="center" mb={4}>
                    <RiskBadge zone={result.risk_zone} />
                </Box>

                <Grid container spacing={4} alignItems="center">
                    <Grid size={{ xs: 12, md: 6 }}>
                        <ScoreCard score={result.score} />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <FinancialChart ratios={result.ratios} />
                    </Grid>
                </Grid>

                <Box mt={4}>
                    <Grid container spacing={2}>
                        <Grid size={6}>
                            <Typography variant="subtitle1">Runway: <b>{result.ratios.runway_months} months</b></Typography>
                        </Grid>
                        <Grid size={6}>
                            <Typography variant="subtitle1">Savings Rate: <b>{(result.ratios.savings_rate * 100).toFixed(1)}%</b></Typography>
                        </Grid>
                        <Grid size={6}>
                            <Typography variant="subtitle1">3-Month Risk: <b>{result.projection.risk_3_month}</b></Typography>
                        </Grid>
                        <Grid size={6}>
                            <Typography variant="subtitle1">6-Month Risk: <b>{result.projection.risk_6_month}</b></Typography>
                        </Grid>
                    </Grid>
                </Box>

                <Box mt={4} p={3} bgcolor="#f5f5f5" borderRadius={2}>
                    <Typography variant="h5" gutterBottom>AI Advisor</Typography>
                    <Typography variant="body1" style={{ whiteSpace: 'pre-line' }}>{result.ai_advice}</Typography>
                </Box>

                <Box mt={4} display="flex" justifyContent="center" gap={2}>
                    <Button variant="outlined" onClick={() => navigate('/simulate', { state: { financialData, currentResult: result } })}>
                        Simulate Changes
                    </Button>
                    <Button variant="contained" onClick={() => window.print()}>
                        Export / Print
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default Results;
