export interface FinancialInput {
    monthly_income: number;
    fixed_expenses: number;
    total_emi: number;
    existing_savings: number;
    dependents: number;
    age: number;
    insurance_premium: number;
    investments: number;
    goals: string;
}

export interface Ratios {
    emi_to_income: number;
    savings_rate: number;
    runway_months: number;
    expense_to_income: number;
}

export interface Projections {
    risk_3_month: string;
    risk_6_month: string;
}

export interface AnalysisResult {
    score: number;
    risk_zone: string;
    ratios: Ratios;
    projection: Projections;
    ai_advice: string;
}

export interface SimulationChanges {
    new_emi?: number;
    expense_change?: number;
    savings_target?: number;
}

export interface SimulationInput {
    current_data: FinancialInput;
    changes: SimulationChanges;
}
