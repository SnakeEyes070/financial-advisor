import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("XAI_API_KEY")
client = OpenAI(
    api_key=api_key,
    base_url="https://api.x.ai/v1"
) if api_key else None

def generate_financial_advice(financial_data: dict, risk_zone: str) -> str:
    if not client:
        return "AI Advice unavailable (Server running in offline mode due to missing API Key). Please set XAI_API_KEY."

    prompt = f"""
    You are a financial advisor for Indian middle-class families. 
    Use simple Hindi+English mix (Hinglish).
    
    User Data: {financial_data}
    Risk Zone: {risk_zone}
    
    Provide:
    1. Current situation summary (2 lines)
    2. Top 3 immediate risks
    3. Action steps for next 30-90 days
    4. Long-term suggestions
    
    Be practical, non-technical, and culturally relevant for India.
    """
    
    try:
        response = client.chat.completions.create(
            model="grok-beta",
            messages=[
                {"role": "system", "content": "You are a helpful financial advisor for Indians."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=500
        )
        return response.choices[0].message.content
    except Exception as e:
        print(f"Error calling LLM: {e}")
        return "Could not generate advice at this time. Please try again later."
