import './App.css';
import React, { useState }  from 'react';

function CalculateYearsForm(props) {
  const [value, setValue] = useState('');

  // Calculate number of years, set states of results component to display results
  function handleSubmit(submitEvent) {
    alert('Form input submited! It says: ' + value);
    submitEvent.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="number" value={value} onChange={event => {setValue(event.target.value)}} placeholder={props.placeholder} />
      <br></br>
      <br></br>
      <button type="submit">Calculate</button>
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
        <CalculateYearsForm placeholder="placeholder text!"></CalculateYearsForm>
      </body>
      <footer className="App-footer">
        <p>
          Created by Anthony O'Brien with React.js.
          <br></br>
          Designed to estimate repayment information for plan 5 student loans.
          Assumptions such as rate of RPI, CPI and future government policy have been made.
          <br></br>
          Last update April 2023.
        </p>
        <a href="https://github.com/anthony0br/plan-5-loan-calculator">View Github repository</a>
        <br/>
      </footer>
    </div>
  );
}

export default App;
