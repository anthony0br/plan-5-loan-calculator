import './App.css';
import React, { useState }  from 'react';

function CalculateYearsForm(props) {
  // Input hooks
  const [loanAmount, setLoanAmount] = useState("42000");
  const [startingSalary, setSalary] = useState("25000");

  // Output hooks
  const [loanClass, setLoanClass] = useState("");
  const [resultsDisplay, setResultsDisplay] = useState("none");
  const [yearsResult, setYearsResult] = useState("");

  // Calculate number of years, set states of results component to display results
  function handleSubmit(submitEvent) {
    submitEvent.preventDefault();

    // Check for empty or invalid amounts
    let loanRemaining = Number(loanAmount)
    if (loanAmount === "" || Number.isNaN(loanRemaining) || loanRemaining < 0) {
      setLoanClass("invalid");
      return;
    }

    // Set textboxes to valid
    setLoanClass("");


    // Display results
    setResultsDisplay("block");
  }

  const resultsStyle = {
    display: resultsDisplay,
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Number of Years Calculator</h1>
      <p>Currently, this app only calculates the number of years it will take to repay a loan. Calculators for other missing variables will be added later.</p>
      
      <h3>Total loan to pay</h3>
      <p>The total outstanding amount you need to pay, including maintenance and tuition.</p>
      <input type="number" className={loanClass} value={loanAmount} onChange={event => {setLoanAmount(event.target.value)}} />

      <h3>Salary modelling</h3>
      <p>This is a simple model of your projected salary. Each year the salary increases by salaryIncrease + salary * salaryGrowth.</p>
      <p>Salary growth: </p>
      <input type="number" value={startingSalary} onChange={event => {setSalary(event.target.value)}} />
      <p>Salary increase: </p>
      <input type="number" value={startingSalary} onChange={event => {setSalary(event.target.value)}} />
      <br></br>
      <br></br>
      <button type="submit">Calculate</button>
      <br></br>
      <br></br>
      <div className="results" style={resultsStyle}>
        <h1>Results</h1>
        <p>It will take roughly {yearsResult} to pay off your plan 5 student loan. Note that after 40 years, your debt will be wiped.</p>
      </div>
    </form>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Student Loan Calculator
        </p>
      </header>
      <body className="App-body">
        <CalculateYearsForm></CalculateYearsForm>
      </body>
      <footer className="App-footer">
        <p>
          Created by Anthony O'Brien with React.js.
          <br></br>
          Designed to estimate repayment information for plan 5 student loans.
          Assumptions such as rate of RPI, CPI and future government policy have been made.
          <br></br>
          Licensed under GNU GPL-3.0. Last update April 2023.
        </p>
        <a href="https://github.com/anthony0br/plan-5-loan-calculator">View Github repository</a>
      </footer>
    </div>
  );
}

export default App;
