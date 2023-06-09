import React, { useState }  from 'react';

// Constant assumptions
const THRESHOLD = 25000;
const AVERAGE_CPI = 0.026;
const AVERAGE_RPI = 0.032;
const REPAY_RATE = 0.09;
const WRITE_OFF_TIME = 40;

export default function CalculatorForm(props) {
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