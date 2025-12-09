from schemas import FinancialInput, Ratios, Projections

def calculate_ratios(data: FinancialInput) -> Ratios:
    emi_to_income = data.total_emi / data.monthly_income if data.monthly_income > 0 else 0
    
    total_monthly_outflow = data.fixed_expenses + data.total_emi + (data.insurance_premium / 12)
    savings = data.monthly_income - total_monthly_outflow
    savings_rate = savings / data.monthly_income if data.monthly_income > 0 else 0
    
    runway_months = data.existing_savings / total_monthly_outflow if total_monthly_outflow > 0 else 0
    
    expense_to_income = total_monthly_outflow / data.monthly_income if data.monthly_income > 0 else 0

    return Ratios(
        emi_to_income=round(emi_to_income, 2),
        savings_rate=round(savings_rate, 2),
        runway_months=round(runway_months, 1),
        expense_to_income=round(expense_to_income, 2)
    )

def determine_risk_zone(ratios: Ratios) -> str:
    # Exact thresholds from requirements
    # Critical: EMI > 50% OR runway < 1 month
    if ratios.emi_to_income > 0.50 or ratios.runway_months < 1:
        return "Critical"
    
    # Risk: EMI 35-50% OR runway 1-3 months
    if (0.35 <= ratios.emi_to_income <= 0.50) or (1 <= ratios.runway_months < 3):
        return "Risk"
    
    # Neutral: EMI 20-35% OR runway 3-6 months
    if (0.20 <= ratios.emi_to_income < 0.35) or (3 <= ratios.runway_months < 6):
        return "Neutral"
    
    # Growth: EMI < 20% AND runway 6-12 months
    # Note: Logic asks for Growth or Wealth. 
    # Wealth: EMI < 10% AND runway > 12 months
    if ratios.emi_to_income < 0.10 and ratios.runway_months > 12:
        return "Wealth Building"

    if ratios.emi_to_income < 0.20 and (6 <= ratios.runway_months <= 12):
        return "Growth"
        
    # Default fallback if gaps or overlaps (though logic seems to cover major bases, 
    # "Growth" requires EMI < 20 AND Runway 6-12. 
    # If EMI < 20 but runway > 12 -> Wealth.
    # If EMI < 20 but runway < 6 -> Neutral/Risk/Critical caught above.
    return "Neutral"

def calculate_score(ratios: Ratios) -> float:
    # Score formula: Weighted average of ratios (40% runway, 30% savings rate, 20% EMI ratio, 10% expense ratio)
    # We need to normalize these to 0-100 scale.
    
    # Runway: > 6 months is great (100), < 1 is bad (0). Linear interp? 
    # Let's define a score for runway. Cap at 12 months = 100.
    runway_score = min(ratios.runway_months / 12 * 100, 100)
    
    # Savings Rate: > 30% is great (100), < 0 is bad (0).
    savings_score = min(max(ratios.savings_rate / 0.30 * 100, 0), 100)
    
    # EMI Ratio: < 20% is great (100), > 60% is bad (0). Inverse.
    # 0.2 -> 100, 0.6 -> 0
    # y = mx + c. 100 = 0.2m + c, 0 = 0.6m + c. 
    # -100 = 0.4m => m = -250. 
    # c = 100 - (0.2 * -250) = 150.
    # Score = -250 * ratio + 150.
    emi_score = -250 * ratios.emi_to_income + 150
    emi_score = min(max(emi_score, 0), 100)
    
    # Expense Ratio: < 50% is good (100), > 100% is bad (0).
    # 0.5 -> 100, 1.0 -> 0.
    # m = (0-100)/(1.0-0.5) = -200
    # c = 100 - (-200 * 0.5) = 200
    # Score = -200 * ratio + 200
    expense_score = -200 * ratios.expense_to_income + 200
    expense_score = min(max(expense_score, 0), 100)

    total_score = (0.4 * runway_score) + (0.3 * savings_score) + (0.2 * emi_score) + (0.1 * expense_score)
    return round(total_score)

def calculate_projections(ratios: Ratios) -> Projections:
    # Simple projection logic based on current burn and runway
    
    # 3 Month Risk
    if ratios.runway_months < 3:
        risk_3 = "High"
    elif ratios.runway_months < 6:
        risk_3 = "Medium"
    else:
        risk_3 = "Low"
        
    # 6 Month Risk
    if ratios.runway_months < 6:
        risk_6 = "High"
    elif ratios.runway_months < 12:
        risk_6 = "Medium"
    else:
        risk_6 = "Low"
        
    return Projections(risk_3_month=risk_3, risk_6_month=risk_6)

def analyze_financials(data: FinancialInput):
    ratios = calculate_ratios(data)
    risk_zone = determine_risk_zone(ratios)
    score = calculate_score(ratios)
    projection = calculate_projections(ratios)
    
    return {
        "score": score,
        "risk_zone": risk_zone,
        "ratios": ratios,
        "projection": projection
    }
