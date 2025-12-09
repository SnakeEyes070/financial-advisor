import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Ratios } from '../types/financial';
import { Typography, Box } from '@mui/material';

interface FinancialChartProps {
    ratios: Ratios;
}

const FinancialChart: React.FC<FinancialChartProps> = ({ ratios }) => {
    const data = [
        { name: 'EMI/Income', value: ratios.emi_to_income * 100, threshold: 30 },
        { name: 'Savings Rate', value: ratios.savings_rate * 100, threshold: 30 },
        { name: 'Expenses/Inc', value: ratios.expense_to_income * 100, threshold: 50 },
    ];

    return (
        <Box sx={{ width: '100%', height: 300 }}>
            <Typography variant="h6" align="center" gutterBottom>Key Financial Ratios (%)</Typography>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis dataKey="name" type="category" width={100} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#8884d8">
                        {data.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={index === 0 ? '#ef5350' : index === 1 ? '#66bb6a' : '#ffa726'} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </Box>
    );
};

export default FinancialChart;
