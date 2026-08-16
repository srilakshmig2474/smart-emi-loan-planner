# Smart EMI & Loan Planner

A modern and responsive **EMI & Loan Planning Web Application** built using HTML, CSS, and JavaScript.

The project started as a simple EMI calculator and was upgraded into an interactive loan-planning application that helps users calculate EMI, understand repayment, compare loans, save calculations, analyze amortization, and download detailed reports.

Live Project Link: https://smart-emi-loan-planner.vercel.app/
---

## 📌 About the Project

Smart EMI & Loan Planner helps users understand their loan repayment in a simple and visual way.

Users can enter:

- Loan Type
- Currency
- Loan Amount
- Interest Rate
- Tenure
- Tenure Unit (Years / Months)

The application dynamically calculates the EMI and displays the complete repayment summary.

---

## ✨ Features

### 🧮 EMI Calculator

- Calculate monthly EMI
- Calculate total interest
- Calculate total payment
- Calculate total repayment tenure
- Uses the standard reducing-balance EMI formula

### 🚗 Loan Types

Supports:

- Home Loan
- Car Loan
- Personal Loan
- Education Loan
- Business Loan

### 💱 Multiple Currencies

Supports:

- ₹ INR
- $ USD
- € EUR
- £ GBP

### 📊 Payment Breakdown

A simple doughnut visualization shows:

- Loan Principal
- Total Interest

This makes the repayment structure easier to understand.

### 📋 Amortization Schedule

Provides a complete monthly repayment table containing:

- Month
- EMI
- Principal
- Interest
- Remaining Balance

Users can also search the schedule by month.

### 📥 CSV Export

The complete amortization schedule can be exported as a CSV file for further analysis in Excel or other spreadsheet applications.

### 💾 Save Calculations

Users can save loan calculations in their browser using Local Storage.

Saved information includes:

- Loan Type
- Currency
- Loan Amount
- Interest Rate
- Tenure
- EMI

### 🗂️ Saved Loans

Users can:

- View saved loans
- Delete individual calculations
- Clear all saved calculations

### ⚖️ Loan Comparison

Compare two loan options based on:

- Loan Amount
- Interest Rate
- Tenure
- EMI
- Total Interest
- Total Repayment

The application identifies which option has the lower overall repayment.

### 📄 Download Loan Report

Generates a detailed loan report containing:

- Loan summary
- Loan details
- EMI
- Total Interest
- Total Payment
- Total Tenure
- Complete amortization schedule

The report can also be printed or saved as PDF through the browser.

### 🔄 Reset

Reset the calculator to its default values and start a new calculation.

### 🌙 Dark Mode

Includes a light and dark theme for comfortable viewing.

### 📱 Responsive Design

The application adapts to:

- Desktop
- Laptop
- Tablet
- Mobile

---

## 🛠️ Technologies Used

### HTML5

Used for:

- Application structure
- Forms
- Input fields
- Buttons
- Tables
- Navigation
- Sections

### CSS3

Used for:

- Modern UI design
- Responsive layouts
- Cards
- Buttons
- Colors
- Typography
- Dark mode
- Mobile responsiveness

### JavaScript

Used for:

- EMI calculations
- Interest calculations
- Amortization calculations
- Dynamic DOM updates
- Loan comparison
- Saved calculations
- Local Storage
- CSV generation
- Report generation
- Currency switching
- Dark mode
- Reset functionality
- Navigation
- Canvas visualization

### Browser Local Storage

Used to store saved loan calculations locally in the user's browser.

### HTML5 Canvas

Used to create the payment breakdown visualization without an external chart library.

---

## 🧮 EMI Calculation

The application uses the standard EMI formula:

EMI = P × r × (1 + r)^n / ((1 + r)^n - 1)

Where:

- P = Principal loan amount
- r = Monthly interest rate
- n = Total number of monthly payments

The annual interest rate is converted into a monthly rate before calculation.

### Example

For a car loan:

| Parameter | Value |
|---|---:|
| Loan Type | Car Loan |
| Loan Amount | ₹10,00,000 |
| Interest Rate | 2% p.a. |
| Tenure | 3 Years |
| Payments | 36 Months |

Expected result:

- Monthly EMI: approximately ₹28,643
- Total Interest: approximately ₹31,133
- Total Payment: approximately ₹10,31,133

---

## 🔄 Project Evolution

### Original Version

The project was initially a small basic EMI calculator with:

- Loan amount
- Interest rate
- Tenure
- Basic interest calculation
- Total repayment calculation

### Upgraded Version

The project was enhanced with:

- Modern responsive UI
- Multiple loan types
- Multiple currencies
- EMI calculation
- Total interest and payment calculation
- Amortization schedule
- Payment visualization
- Loan comparison
- Saved calculations
- Local Storage
- CSV export
- Detailed loan reports
- Print / Save as PDF
- Dark mode
- Reset functionality
- Responsive mobile design
- User-friendly loan insights

The project was transformed from a basic calculator into an **interactive personal finance web application**.

---

## 📂 Project Structure

```text
smart-emi-loan-planner/
│
├── index.html
├── style.css
├── script.js
└── README.md
```
## 🎯 Learning Outcomes

This project provided practical experience with:

- HTML5
- CSS3
- JavaScript
- Responsive Web Design
- DOM Manipulation
- Mathematical Calculations
- EMI Formulas
- Amortization
- Dynamic Tables
- HTML Canvas
- Local Storage
- File Generation
- CSV Export
- Client-side Reports
- Dark Mode
- Form Handling
- Git
- GitHub
- Web Deployment

## 📌 Project Status

**Status:** Completed & Working ✅

The application has been tested locally and the major features are working successfully.

## 📜 License

This project was created for educational and portfolio purposes.

## 👩‍💻 Developed By

**Guttula Sri Lakshmi**

Smart EMI & Loan Planner
