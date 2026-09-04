import { useEffect, useState } from "react";
import "./App.css";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://credit-risk-prediction-api-rjtg.onrender.com";

function App() {
  const [health, setHealth] = useState("Checking API connection...");
  const [formData, setFormData] = useState("{}");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function checkApiHealth() {
      try {
        const response = await fetch(`${API_URL}/health`);

        if (!response.ok) {
          throw new Error("The API health check failed.");
        }

        const data = await response.json();

        setHealth(
          data.status === "healthy"
            ? "Backend API is connected and healthy."
            : "Backend API responded, but is not healthy."
        );
      } catch {
        setHealth("Backend API connection failed.");
      }
    }

    checkApiHealth();
  }, []);

  async function handlePrediction(event) {
    event.preventDefault();

    setError("");
    setResult(null);

    let payload;

    try {
      payload = JSON.parse(formData);
    } catch {
      setError("Invalid JSON. Copy a valid request body from the API documentation.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          typeof data.detail === "string"
            ? data.detail
            : "Prediction request failed. Check the required fields."
        );
      }

      setResult(data);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page">
      <section className="hero">
        <p className="eyebrow">Machine Learning Loan Assessment</p>
        <h1>Credit Risk Prediction</h1>
        <p>
          Estimate loan default risk using the deployed XGBoost prediction model.
        </p>

        <div className="status-card">
          <h2>API Status</h2>
          <p>{health}</p>
        </div>

        <form className="prediction-form" onSubmit={handlePrediction}>
          <h2>Applicant Details</h2>
          <p className="form-help">
            Copy the example JSON from <strong>POST /predict</strong> in API
            Documentation, update the applicant values, and click Predict.
          </p>

          <textarea
            value={formData}
            onChange={(event) => setFormData(event.target.value)}
            placeholder='{"AMT_INCOME_TOTAL": 180000, "AMT_CREDIT": 500000}'
            rows="14"
            spellCheck="false"
          />

          <button className="primary-button" type="submit" disabled={loading}>
            {loading ? "Calculating..." : "Predict Default Risk"}
          </button>
        </form>

        {error && <div className="error-message">{error}</div>}

        {result && (
          <section
            className={`result-card ${
              result.prediction === 1 ? "high-risk" : "low-risk"
            }`}
          >
            <p className="result-label">Prediction Result</p>
            <h2>{result.risk}</h2>
            <p>
              <strong>Default probability:</strong>{" "}
              {(result.default_probability * 100).toFixed(2)}%
            </p>
            <p>
              <strong>Decision threshold:</strong>{" "}
              {(result.threshold * 100).toFixed(0)}%
            </p>
          </section>
        )}

        <div className="actions">
          <a
            className="secondary-button"
            href={`${API_URL}/docs`}
            target="_blank"
            rel="noreferrer"
          >
            Open API Documentation
          </a>

          <a
            className="secondary-button"
            href={`${API_URL}/health`}
            target="_blank"
            rel="noreferrer"
          >
            View Health Check
          </a>
        </div>
      </section>
    </main>
  );
}

export default App;