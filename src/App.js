import './App.css';
import React, { useState }  from 'react';

// Constant assumptions
const THRESHOLD = 25000;
const AVERAGE_CPI = 0.026;
const AVERAGE_RPI = 0.032;
const REPAY_RATE = 0.09;
const WRITE_OFF_TIME = 40;

function CalculatorForm(props) {
  // Input hooks
  const [loanAmount, setLoanAmount] = useState("42000");
  const [startingSalary, setStartingSalary] = useState("25000");
  const [salaryGrowth, setSalaryGrowth] = useState("4");
  const [salaryIncrease, setSalaryIncrease] = useState("2000");

  // Output hooks
  const [loanClass, setLoanClass] = useState("");
  const [salaryClass, setSalaryClass] = useState("");
  const [increaseClass, setIncreaseClass] = useState("");
  const [growthClass, setGrowthClass] = useState("");
  const [resultsDisplay, setResultsDisplay] = useState("none");
  const [yearsResult, setYearsResult] = useState("");
  const [salaryResult, setSalaryResult] = useState("");
  const [totalPaid, setTotalPaid] = useState("");

  // Calculate number of years, set states of results component to display results
  function handleSubmit(submitEvent) {
    // Hide old results and prevent refreshing
    submitEvent.preventDefault();
    setResultsDisplay("none");

    // Check for empty or invalid amounts and cast inputs
    let loanRemaining = Number(loanAmount);
    if (loanAmount === "" || Number.isNaN(loanRemaining) || loanRemaining < 0) {
      setLoanClass("invalid");
      return;
    }
    let salary = Number(startingSalary);
    if (startingSalary === "" || Number.isNaN(salary) || salary < 0) {
      setSalaryClass("invalid");
      return;
    }
    let increase = Number(salaryIncrease);
    if (salaryIncrease === "" || Number.isNaN(increase) || increase < 0) {
      setIncreaseClass("invalid");
      return;
    }
    let growth = Number(salaryGrowth) * 0.01;
    if (salaryGrowth === "" || Number.isNaN(growth) || growth < 0) {
      setGrowthClass("invalid");
      return;
    }

    // Set textboxes to valid
    setLoanClass("");
    setSalaryClass("");
    setIncreaseClass("");
    setGrowthClass("");

    // Calculate result
    let numYears = 0;
    let threshold = THRESHOLD;
    let totalPaid = 0;
    while (loanRemaining > 0 && numYears < WRITE_OFF_TIME) {
      numYears += 1;

      // Increase loan, salary, and the threshold
      loanRemaining += loanRemaining * AVERAGE_RPI;
      salary += increase;
      salary *= 1 + growth;
      threshold += threshold * AVERAGE_CPI;

      // Repay part of the loan
      if (salary > threshold) {
        let toPay = (salary - threshold) * REPAY_RATE;
        totalPaid += toPay;
        loanRemaining -= toPay;
      }
    }

    // Display results
    setYearsResult(numYears);
    setSalaryResult(Math.round(salary * 100) / 100);
    setTotalPaid(Math.round(totalPaid * 100) / 100)
    setResultsDisplay("block");
  }

  const resultsStyle = {
    display: resultsDisplay,
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Total loan to pay</h3>
      <p>The total outstanding loan, including maintenance and tuition. Remember, this will include any interest added during your studies.</p>
      <input type="number" className={loanClass} value={loanAmount} onChange={event => {setLoanAmount(event.target.value)}} />

      <h3>Salary modelling</h3>
      <p>This is a simple model of your projected salary. It assumes your salary will increase by a fixed amount and then increase by a fixed percent each year.</p>
      <p>Starting salary (£):</p>
      <input type="number" className={salaryClass} value={startingSalary} onChange={event => {setStartingSalary(event.target.value)}} />
      <p>Salary growth (%) per year: </p>
      <input type="number" className={growthClass} value={salaryGrowth} onChange={event => {setSalaryGrowth(event.target.value)}} />
      <p>Salary increase (£) per year: </p>
      <input type="number" className={increaseClass} value={salaryIncrease} onChange={event => {setSalaryIncrease(event.target.value)}} />
      <br></br>
      <br></br>
      <button type="submit">Calculate</button>
      <br></br>
      <br></br>
      <div className="results" style={resultsStyle}>
        <h1>Results</h1>
        <p><b>These results are a rough estimate only. This model is simplified and makes lots of assumptions, which may become outdated. Government policy is likely to change. See the footer for more information.</b></p>
        <p>It will take roughly {yearsResult} years to pay off your plan 5 student loan. Remember that after 40 years, your debt is wiped.</p>
        <p>According to the model, you will have paid a total of £{totalPaid} in student loan fees and your salary at the time of paying off the loan will be £{salaryResult}.</p>
      </div>
    </form>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Plan 5 Student Loan Calculator
        </p>
      </header>
      <body className="App-body">
        <CalculatorForm></CalculatorForm>
      </body>
      <footer className="App-footer">
        <p>
          Created by Anthony O'Brien with <a href="https://github.com/facebook/create-react-app">Create React App</a> and React.js.
          <br /><br />
          Results are an estimate and only for <b>UK Plan 5</b> undergraduate student loans.
          Many assumptions have been made such as: 
          the rate of RPI as 2.6%, the rate of CPI as 3.2%, interest and payments are calculated anually, your salary follows the model above, the threshold begins at £25,000 and is subsequently linked to CPI. 
          Note that the threshold is currently frozen but will likely increase in the future, and interest may be increased for higher earners. 
          Note that "Salary growth" includes all factors that increase exponentially such as national wage growth and percentage pay rises and "Salary increase" is not adjusted for inflation.
          This tool is not financial advice. It is important you understand the implications of these assumptions and check their validity. 
          If you notice any invalid assumptions, please raise an issue or pull request on GitHub or contact me.
          <br /><br />
          Licensed under GNU GPL-3.0. Last updated April 2023.
        </p>
        <a href="https://github.com/anthony0br/plan-5-loan-calculator">View Github repository</a>
      </footer>
    </div>
  );
}

export default App;
