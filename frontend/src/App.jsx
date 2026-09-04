import { useEffect, useState } from "react";
import "./App.css";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://credit-risk-prediction-api-rjtg.onrender.com";

function App() {
  const [health, setHealth] = useState("Checking API connection...");
  const [error, setError] = useState("");

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
      } catch (requestError) {
        setHealth("Backend API connection failed.");
        setError(
          "The Render backend may be waking up. Wait about one minute and refresh the page."
        );
      }
    }

    checkApiHealth();
  }, []);

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
          {error && <p className="error">{error}</p>}
        </div>

        <div className="actions">
          <a
            className="primary-button"
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