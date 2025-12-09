import React, { useState } from 'react';
import { TextField, Button, Grid, Paper, Typography, Box, Tooltip, IconButton } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import type { FinancialInput } from '../types/financial';
import { useNavigate } from 'react-router-dom';

const InputForm: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<FinancialInput>({
        monthly_income: 0,
        fixed_expenses: 0,
        total_emi: 0,
        existing_savings: 0,
        dependents: 0,
        age: 0,
        insurance_premium: 0,
        investments: 0,
        goals: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: name === 'goals' ? value : Number(value) }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Pass data via state or context. For simplicity, we use state in navigation.
        navigate('/results', { state: { financialData: formData } });
    };

    const fillDemoData = () => {
        setFormData({
            monthly_income: 75000,
            fixed_expenses: 35000,
            total_emi: 15000,
            existing_savings: 200000,
            dependents: 2,
            age: 32,
            insurance_premium: 5000,
            investments: 100000,
            goals: 'Buy house in 5 years'
        });
    };

    const renderField = (name: keyof FinancialInput, label: string, tooltip: string, type: string = 'number') => (
        <Grid size={{ xs: 12, sm: 6 }}>
            <Box display="flex" alignItems="center">
                <TextField
                    fullWidth
                    label={label}
                    name={name}
                    type={type}
                    value={formData[name] || ''}
                    onChange={handleChange}
                    required
                    margin="normal"
                />
                <Tooltip title={tooltip}>
                    <IconButton size="small">
                        <InfoIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            </Box>
        </Grid>
    );

    return (
        <Paper elevation={3} sx={{ p: 4, maxWidth: 800, margin: '20px auto' }}>
            <Typography variant="h4" gutterBottom align="center">Financial Details</Typography>
            <Box mb={2} textAlign="center">
                <Button variant="outlined" onClick={fillDemoData}>Fill Demo Data</Button>
            </Box>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {renderField('monthly_income', 'Monthly Income (₹)', 'Your take-home monthly salary')}
                    {renderField('fixed_expenses', 'Fixed Expenses (₹)', 'Rent, grocery, utilities, etc.',)}
                    {renderField('total_emi', 'Total EMI (₹)', 'Sum of all loan EMIs')}
                    {renderField('existing_savings', 'Total Savings (₹)', 'Cash in bank + Emergency fund')}
                    {renderField('dependents', 'Dependents', 'Number of people dependent on your income')}
                    {renderField('age', 'Age', 'Your current age')}
                    {renderField('insurance_premium', 'Annual Insurance Premium (₹)', 'Total yearly premium for life + health')}
                    {renderField('investments', 'Current Investments (₹)', 'Stocks, MF, FD, etc.')}
                    {renderField('goals', 'Financial Goals', 'E.g., Buy house, Retirement, Education', 'text')}
                </Grid>
                <Box mt={4} textAlign="center">
                    <Button type="submit" variant="contained" color="primary" size="large">
                        Analyze Stability
                    </Button>
                </Box>
            </form>
        </Paper>
    );
};

export default InputForm;
