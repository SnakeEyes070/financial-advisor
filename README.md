# Financial Stability Advisor

A GenAI-powered web application that analyzes financial data for Indian households, providing stability scores, risk zones, and personalized action plans.

## Features

- **Financial Stability Score**: 0-100 score based on key ratios.
- **Risk Zone Analysis**: Categorization into Critical, Risk, Neutral, Growth, or Wealth zones.
- **AI Advisor**: Personalized financial advice in Hinglish using GenAI.
- **Scenario Simulator**: Simulate changes in EMI or expenses to see impact on stability.
- **Responsive Design**: Mobile-friendly UI.

## Tech Stack

- **Backend**: Python, FastAPI, OpenAI API
- **Frontend**: React, TypeScript, Vite, Material UI, Recharts

## Setup Instructions

### Prerequisites

- Node.js (v18+)
- Python (v3.9+)
- OpenAI API Key

### Backend Setup

1. Navigate to `backend/`:
   ```bash
   cd backend
   ```
2. Create virtual environment (optional but recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Create `.env` file and add your OpenAI API Key:
   ```
   OPENAI_API_KEY=your_key_here
   ```
5. Run server:
   ```bash
   uvicorn main:app --reload
   ```
   Server runs at `http://localhost:8000`. API Docs at `http://localhost:8000/docs`.

### Frontend Setup

1. Navigate to `frontend/`:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run development server:
   ```bash
   npm run dev
   ```
   App runs at `http://localhost:5173`.

## Deployment

- **Backend**: Ready for Render/Railway using `render.yaml`.
- **Frontend**: Ready for Vercel/Netlify using `vercel.json`.

## Test Cases

- **Critical**: Income 30k, EMI 25k -> EMI > 50%
- **Wealth**: Income 1L, EMI 15k, Savings 5L -> EMI < 20%, Runway > 12m
