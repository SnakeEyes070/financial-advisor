import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Grid, Typography, Button, Paper, Slider, Box, CircularProgress } from '@mui/material';
import { simulateFinances } from '../services/api';
import { FinancialInput, AnalysisResult } from '../types/financial';
import ScoreCard from '../components/ScoreCard';
import RiskBadge from '../components/RiskBadge';

const Simulation: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { financialData, currentResult } = location.state as { financialData: FinancialInput, currentResult: AnalysisResult };

    // Simulation states
    const [newEmi, setNewEmi] = useState<number>(financialData?.total_emi || 0);
    const [expenseChange, setExpenseChange] = useState<number>(0);
    const [simulatedResult, setSimulatedResult] = useState<AnalysisResult | null>(currentResult);
    const [loading, setLoading] = useState(false);

    const handleSimulate = async () => {
        setLoading(true);
        try {
            const res = await simulateFinances({
                current_data: financialData,
                changes: {
                    new_emi: newEmi,
                    expense_change: expenseChange
                }
            });
            setSimulatedResult(res);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (!financialData) return <Typography>No data to simulate.</Typography>;

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom align="center">Scenario Simulator</Typography>
            <Grid container spacing={4}>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>Adjust Parameters</Typography>

                        <Box mb={3}>
                            <Typography gutterBottom>New Total EMI: ₹{newEmi}</Typography>
                            <Slider
                                value={newEmi}
                                min={0}
                                max={financialData.monthly_income}
                                step={1000}
                                onChange={(_, val) => setNewEmi(val as number)}
                            />
                        </Box>

                        <Box mb={3}>
                            <Typography gutterBottom>Change in Monthly Expenses: ₹{expenseChange > 0 ? '+' : ''}{expenseChange}</Typography>
                            <Slider
                                value={expenseChange}
                                min={-20000}
                                max={20000}
                                step={500}
                                onChange={(_, val) => setExpenseChange(val as number)}
                            />
                        </Box>

                        <Button variant="contained" fullWidth onClick={handleSimulate} disabled={loading}>
                            {loading ? <CircularProgress size={24} /> : "Run Simulation"}
                        </Button>
                    </Paper>
                </Grid>

                <Grid size={{ xs: 12, md: 8 }}>
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Paper sx={{ p: 3, textAlign: 'center' }}>
                                <Typography variant="h6" color="text.secondary">Current</Typography>
                                <RiskBadge zone={currentResult.risk_zone} />
                                <Box mt={2}>
                                    <ScoreCard score={currentResult.score} />
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Paper sx={{ p: 3, textAlign: 'center', bgcolor: '#f0f4ff' }}>
                                <Typography variant="h6" color="primary">Simulated</Typography>
                                {simulatedResult && (
                                    <>
                                        <RiskBadge zone={simulatedResult.risk_zone} />
                                        <Box mt={2}>
                                            <ScoreCard score={simulatedResult.score} />
                                        </Box>
                                    </>
                                )}
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Box mt={4} textAlign="center">
                <Button variant="outlined" onClick={() => navigate('/')}>Start Over</Button>
            </Box>
        </Container>
    );
};

export default Simulation;
