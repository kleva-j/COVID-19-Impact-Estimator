import React, { useState } from 'react';
import { render } from 'react-dom';
import Form from './form';
import Results from './results';
import Estimator from './estimator';
import * as serviceWorker from './serviceWorker';

import './style.css';

function App() {
  const [state, setState] = useState({
    regionName: '',
    timeToElapse: '',
    periodType: 'Days',
    avgAge: '',
    avgDailyIncome: '',
    avgIncomePopulation: '',
    reportedCases: '',
    totalHospitalBeds: '',
    population: ''
  });

  const [result, setResult] = useState(undefined);

  const {
    regionName,
    timeToElapse,
    periodType,
    avgAge,
    avgDailyIncome,
    avgIncomePopulation,
    reportedCases,
    totalHospitalBeds,
    population
  } = state;

  const formData = {
    regionName,
    timeToElapse,
    periodType,
    avgAge,
    avgDailyIncome,
    avgIncomePopulation,
    reportedCases,
    totalHospitalBeds,
    population
  };

  const handleUpdate = ({ target }) => {
    const { dataset, value } = target;
    const key = Object.keys(dataset)[0];
    return setState({ ...state, [key]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newResult = Estimator({
      region: {
        name: regionName,
        avgAge,
        avgDailyIncomeInUSD: avgDailyIncome,
        avgDailyIncomePopulation: avgIncomePopulation
      },
      periodType,
      timeToElapse,
      reportedCases,
      population,
      totalHospitalBeds
    });
    setResult({ ...newResult });
  };

  return (
    <section className="section">
      <header></header>

      <section className="container">
        <article className="article">
          <Form
            formData={formData}
            handleSubmit={handleSubmit}
            handleUpdate={handleUpdate}
          />
        </article>

        <aside className="aside">
          <div>
            {!result ? (
              <h1>Results will be shown here.</h1>
            ) : (
              <Results
                result={result}
                data={formData}
              />
            )}
          </div>
        </aside>
      </section>
    </section>
  );
}

render(<App />, document.querySelector('#root'));

serviceWorker.register();
