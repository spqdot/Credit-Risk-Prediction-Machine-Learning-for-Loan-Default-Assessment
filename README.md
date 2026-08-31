# Credit Default Risk Prediction

## Overview

This project develops a machine learning model to predict whether a loan applicant is likely to default.

The project focuses on binary classification of credit risk using applicant demographic, financial, employment, housing, and credit-related information.

The main objectives are to:

- Explore and understand the dataset
- Identify data quality and missing-value issues
- Analyze factors associated with loan default
- Handle class imbalance
- Build and compare multiple machine learning models
- Optimize the classification threshold
- Explain model predictions using SHAP
- Select and save a final model for future predictions

---

## Business Problem

Financial institutions need to identify applicants who have a higher probability of defaulting on their loans.

An effective credit-risk model can help lenders:

- Identify potentially high-risk applicants
- Support loan approval decisions
- Reduce potential financial losses
- Improve risk-based decision making
- Prioritize applicants for additional assessment

Because loan default is a relatively rare event, this is an imbalanced classification problem.

Therefore, model evaluation should not rely on accuracy alone.

---

## Dataset

The project uses the Home Credit-style application dataset.

The target variable is:

`TARGET`

where:

- `0` = applicant did not default
- `1` = applicant defaulted

The dataset contains approximately 307,511 observations before the train/validation split.

The target distribution is approximately:

- `TARGET = 0`: 91.93%
- `TARGET = 1`: 8.07%

This class imbalance makes metrics such as ROC-AUC, PR-AUC, precision, recall, and F1-score particularly important.

---

## Project Workflow

The project follows the following machine learning workflow:

1. Exploratory Data Analysis
2. Data quality and missing-value analysis
3. Feature analysis
4. Train/validation split
5. Data preprocessing
6. Class imbalance analysis
7. Baseline model development
8. Model comparison
9. XGBoost development
10. Hyperparameter tuning
11. Classification threshold optimization
12. Model explainability using SHAP
13. Final model evaluation
14. Model persistence

---

## Exploratory Data Analysis

Several categorical and numerical variables were investigated to understand their relationship with default risk.

### Contract Type

Cash loans showed a higher default rate than revolving loans.

Approximate default rates:

| Contract Type | Default Rate |
|---|---:|
| Cash loans | 8.3% |
| Revolving loans | 5.5% |

### Education

Default rates varied substantially across education categories.

The observed default rates included approximately:

| Education Level | Default Rate |
|---|---:|
| Lower secondary | 10.93% |
| Secondary / secondary special | 8.94% |
| Incomplete higher | 8.48% |
| Higher education | 5.36% |
| Academic degree | 1.83% |

These results indicate that education level is associated with differences in observed default rates.

### Occupation

Default rates also varied considerably across occupation groups.

Low-skilled laborers showed the highest observed default rate among the displayed occupation groups, while accountants showed a substantially lower rate.

This suggests that occupation-related information may provide useful predictive information for credit-risk modeling.

### Income Type

Default rates differed substantially across income types.

For example, the observed rates included:

- Maternity leave: 40.0%
- Unemployed: 36.36%
- Working: 9.59%
- Commercial associate: 7.48%
- State servant: 5.75%
- Pensioner: 5.39%

The categories with very small sample sizes should be interpreted cautiously.

### Family Status

Observed default rates also varied by family status.

Civil marriage and single/not-married applicants showed higher default rates than married and widow categories.

### Housing Type

Applicants living in rented apartments and with parents showed higher observed default rates than applicants living in house/apartment categories.

---

## Numerical Feature Analysis

Important numerical variables included:

- Age
- Employment years
- Credit-to-income ratio
- Annuity-to-income ratio
- Goods-to-income ratio

Missing values were identified in several variables, including employment duration and some ratio-related features.

The preprocessing pipeline handled missing values and transformed categorical variables for machine learning.

---

## Data Preprocessing

The dataset was divided into training and validation sets using a stratified split.

The resulting datasets were:

- Training set: `246,008` observations
- Validation set: `61,503` observations

The target distribution was preserved between the training and validation sets.

The processed feature matrix contained approximately 200 features after preprocessing.

The preprocessing workflow included:

- Missing-value handling
- Numerical feature processing
- Categorical feature encoding
- Feature transformation

---

## Models

Three classification models were evaluated:

1. Logistic Regression
2. Random Forest
3. XGBoost

---

## Model Comparison

The models were evaluated using:

- Accuracy
- ROC-AUC
- PR-AUC

The results were:

| Model | Accuracy | ROC-AUC | PR-AUC |
|---|---:|---:|---:|
| Logistic Regression | 0.6901 | 0.7491 | 0.2284 |
| Random Forest | 0.8040 | 0.7404 | 0.2167 |
| XGBoost | 0.7108 | 0.7608 | 0.2513 |

### Model Selection

Random Forest achieved the highest accuracy.

However, accuracy is not the most informative metric for this problem because approximately 92% of observations belong to the non-default class.

XGBoost achieved:

- The highest ROC-AUC: `0.7608`
- The highest PR-AUC: `0.2513`

Therefore, XGBoost was selected as the preferred final model based on its stronger ability to discriminate between default and non-default applicants.

---

## Hyperparameter Tuning

XGBoost hyperparameters were investigated using `RandomizedSearchCV`.

The tuning search included combinations of:

- `n_estimators`: 200, 300
- `max_depth`: 3, 5, 7
- `learning_rate`: 0.03, 0.05, 0.1
- `subsample`: 0.8
- `colsample_bytree`: 0.8

The best configuration identified during tuning included:

```text
n_estimators = 300
max_depth = 5
learning_rate = 0.03
subsample = 0.8
colsample_bytree = 0.8


### Project Structure

Finance_project/
│
├── Data/
│   ├── application_train.csv
│   ├── application_test.csv
│   └── ...
│
├── models/
│   ├── final_xgb_model.pkl
│   └── preprocessor.pkl
│
├── notebooks/
│   ├── 01_EDA.ipynb
│   └── 02_Preprocessing.ipynb
│
├── reports/
│
├── src/
│
├── README.md
├── requirements.txt
└── .gitignore


### Limitations
  
The model should not be considered a production-ready lending decision system.

Important limitations include:

The dataset is highly imbalanced.
Some categorical groups contain very few observations.
Observational relationships should not be interpreted automatically as causal relationships.
Model performance depends on the underlying dataset and validation methodology.
A real credit decision system would require additional fairness, regulatory, monitoring, calibration, and cost-sensitive evaluation.
The selected classification threshold should ultimately be determined using business costs associated with false positives and false negatives.


### Future Improvements

Potential future work includes:

Probability calibration
Cost-sensitive learning
More systematic hyperparameter optimization
Cross-validation with PR-AUC as an optimization objective
Model monitoring
Fairness analysis across applicant groups
Error analysis of false positives and false negatives
Deployment through a REST API
Development of a credit-risk prediction dashboard
Model versioning and experiment tracking


### Author

Shrabani Panigrahi

Data Science | Machine Learning | AI Engineering

This project demonstrates an end-to-end machine learning workflow covering exploratory data analysis, preprocessing, model development, evaluation, threshold optimization, and model explainability.