import axios from 'axios';
import { FinancialInput, AnalysisResult, SimulationInput } from '../types/financial';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const analyzeFinances = async (data: FinancialInput): Promise<AnalysisResult> => {
    const response = await api.post<AnalysisResult>('/analyze', data);
    return response.data;
};

export const simulateFinances = async (data: SimulationInput): Promise<AnalysisResult> => {
    const response = await api.post<AnalysisResult>('/simulate', data);
    return response.data;
};
