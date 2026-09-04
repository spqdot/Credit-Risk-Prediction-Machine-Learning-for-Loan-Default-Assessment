# Credit Risk Prediction: Machine Learning for Loan Default Assessment

A full-stack machine learning application that predicts the probability of loan default from applicant and loan information.

The project uses an **XGBoost classification model** with a preprocessing pipeline, served through a **FastAPI** backend and accessed from a **React + Vite** frontend.

## Live Links

| Service | Link |
|---|---|
| Frontend | Run locally at `http://localhost:5173` |
| Backend API | [Credit Risk Prediction API](https://credit-risk-prediction-api-rjtg.onrender.com) |
| API Health Check | [View Health Status](https://credit-risk-prediction-api-rjtg.onrender.com/health) |
| Swagger API Documentation | [Open API Documentation](https://credit-risk-prediction-api-rjtg.onrender.com/docs) |
| ReDoc Documentation | [Open ReDoc](https://credit-risk-prediction-api-rjtg.onrender.com/redoc) |

> The backend is hosted on Render's free tier. If inactive, its first request may take around 50–60 seconds while the service starts.

---

## Features

- Predicts loan default risk using a trained XGBoost model.
- Returns a default probability and risk classification.
- Uses a configurable decision threshold of `0.68`.
- FastAPI REST endpoints for health monitoring and predictions.
- Swagger and ReDoc API documentation.
- React frontend that verifies backend connectivity.
- Frontend prediction form that submits JSON data to the API.
- CORS configuration for local frontend-backend communication.

---

## Prediction Output

The prediction endpoint returns a response similar to:

```json
{
  "prediction": 0,
  "risk": "Not Default",
  "default_probability": 0.23,
  "threshold": 0.68
}
```

| Field | Description |
|---|---|
| `prediction` | `0` means **Not Default**; `1` means **Default** |
| `risk` | Human-readable risk category |
| `default_probability` | Model-estimated probability that the applicant will default |
| `threshold` | Decision threshold used to classify risk (`0.68`) |

A prediction is classified as **Default** when:

```text
default_probability >= 0.68
```

---

## Project Structure

```text
Finance_project/
├── api/
│   └── main.py                 # FastAPI application and prediction endpoint
├── models/
│   ├── final_xgb_model.pkl     # Trained XGBoost model
│   └── preprocessor.pkl        # Feature preprocessing pipeline
├── frontend/
│   ├── src/
│   │   ├── App.jsx             # React user interface
│   │   ├── App.css             # Frontend styles
│   │   └── main.jsx            # React entry point
│   ├── .env                    # Local frontend API URL (not committed)
│   ├── index.html
│   └── package.json
├── requirements.txt
└── README.md
```

---

## Backend Setup

### 1. Create and activate a virtual environment

On Windows PowerShell:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

On Git Bash:

```bash
python -m venv .venv
source .venv/Scripts/activate
```

### 2. Install Python dependencies

```bash
pip install -r requirements.txt
```

### 3. Run the FastAPI backend locally

From the project root:

```bash
python -m uvicorn api.main:app --reload
```

The local backend will be available at:

```text
http://127.0.0.1:8000
```

Useful local endpoints:

```text
http://127.0.0.1:8000/health
http://127.0.0.1:8000/docs
http://127.0.0.1:8000/redoc
```

---

## Frontend Setup

### 1. Go to the frontend folder

```bash
cd frontend
```

### 2. Install Node.js dependencies

```bash
npm install
```

### 3. Create the environment file

Create `frontend/.env`:

```env
VITE_API_URL=https://credit-risk-prediction-api-rjtg.onrender.com
```

For local backend testing, use:

```env
VITE_API_URL=http://127.0.0.1:8000
```

### 4. Start the React frontend

```bash
npm run dev
```

Open the URL printed in the terminal, normally:

```text
http://localhost:5173
```

### 5. Build the frontend for production

```bash
npm run build
```

The production build is generated in:

```text
frontend/dist/
```

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | API welcome/status response |
| `GET` | `/health` | Confirms API, model, and preprocessor availability |
| `POST` | `/predict` | Returns loan default prediction |
| `GET` | `/docs` | Swagger interactive documentation |
| `GET` | `/redoc` | ReDoc API documentation |

### Health Check Example

```bash
curl https://credit-risk-prediction-api-rjtg.onrender.com/health
```

Example response:

```json
{
  "status": "healthy",
  "model_loaded": true,
  "preprocessor_loaded": true
}
```

### Prediction Request

Use Swagger documentation to see the complete request schema:

[https://credit-risk-prediction-api-rjtg.onrender.com/docs](https://credit-risk-prediction-api-rjtg.onrender.com/docs)

In Swagger:

1. Open `POST /predict`.
2. Select **Try it out**.
3. Enter applicant values in the request body.
4. Select **Execute**.
5. Review the prediction response.

---

## Deployment

### Backend

The FastAPI backend is deployed on **Render**.

Start command:

```bash
python -m uvicorn api.main:app --host 0.0.0.0 --port $PORT
```

### Frontend

The React frontend can be deployed to:

- Vercel
- Netlify
- Render Static Site

Before deploying the frontend, add its production domain to `allow_origins` in `api/main.py`.

Example:

```python
allow_origins=[
    "http://localhost:5173",
    "https://your-frontend-domain.vercel.app",
]
```

---

## Technology Stack

### Backend

- Python
- FastAPI
- Uvicorn
- XGBoost
- Pandas
- Joblib
- Scikit-learn preprocessing pipeline

### Frontend

- React
- Vite
- CSS
- JavaScript Fetch API

### Deployment

- Render — backend hosting
- GitHub — source control

---

## Repository

GitHub repository:

[Credit-Risk-Prediction-Machine-Learning-for-Loan-Default-Assessment](https://github.com/spqdot/Credit-Risk-Prediction-Machine-Learning-for-Loan-Default-Assessment)