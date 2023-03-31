import logo from './logo.svg';
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
      <textarea value={value} onChange={event => {setValue(event.target.value)}} placeholder={props.placeholder} />
      <input type="submit" value="Calculate! " />
    </form>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Test. Scroll down to see the test form!
        </p>
      </header>
      <body>
        <CalculateYearsForm placeholder="placeholder text!"></CalculateYearsForm>
      </body>
    </div>
  );
}

export default App;
