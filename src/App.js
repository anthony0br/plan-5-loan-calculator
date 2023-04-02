import './App.css';
import React from 'react'
import CalculatorForm from './CalculatorForm'

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
