from pydantic import BaseModel
from typing import Optional, Dict

class FinancialInput(BaseModel):
    monthly_income: float
    fixed_expenses: float
    total_emi: float
    existing_savings: float
    dependents: int
    age: int
    insurance_premium: float
    investments: float
    goals: str

class Ratios(BaseModel):
    emi_to_income: float
    savings_rate: float
    runway_months: float
    expense_to_income: float

class Projections(BaseModel):
    risk_3_month: str
    risk_6_month: str

class AnalysisResult(BaseModel):
    score: float
    risk_zone: str
    ratios: Ratios
    projection: Projections
    ai_advice: str

class SimulationChanges(BaseModel):
    new_emi: Optional[float] = None
    expense_change: Optional[float] = None
    savings_target: Optional[float] = None

class SimulationInput(BaseModel):
    current_data: FinancialInput
    changes: SimulationChanges
