/* eslint-disable react/prop-types */
import React from 'react';

const Form = (props) => {
  const { formData, handleUpdate, handleSubmit } = props;
  const {
    regionName, population, reportedCases,
    avgAge, totalHospitalBeds, avgDailyIncome,
    timeToElapse, periodType, avgIncomePopulation
  } = formData;

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h1>2020 Novel COVID-19 Estimator</h1>

      <div className="input-container">
        <label htmlFor="region-name">
          <input
            type="text"
            className="form-control"
            data-region-name="regionName"
            placeholder="Enter Region Name"
            value={regionName}
            id="region-name"
            required
            onChange={handleUpdate}
          />
        </label>
      </div>

      <div className="input-container">
        <label htmlFor="population">
          <input
            type="number"
            className="form-control"
            data-population="population"
            placeholder="Enter Population of Region"
            value={population}
            id="population"
            required
            onChange={handleUpdate}
          />
        </label>
      </div>

      <div className="input-container">
        <label htmlFor="reported-cases">
          <input
            type="number"
            className="form-control"
            data-reported-cases="reportedCases"
            placeholder="Enter Number of Reported Cases"
            value={reportedCases}
            id="reported-cases"
            required
            onChange={handleUpdate}
          />
        </label>
      </div>

      <div className="flex-input-container">
        <div className="input-container">
          <label htmlFor="avgAge">
            <input
              type="number"
              className="form-control"
              data-avg-age="avgAge"
              placeholder="Average Age"
              value={avgAge}
              id="avgAge"
              required
              onChange={handleUpdate}
            />
          </label>
        </div>

        <div className="input-container">
          <label htmlFor="total-hospital-beds">
            <input
              type="number"
              className="form-control"
              data-total-hospital-beds="totalHospitalBeds"
              placeholder="Total Hospital Beds"
              value={totalHospitalBeds}
              id="total-hospital-beds"
              required
              onChange={handleUpdate}
            />
          </label>
        </div>
      </div>

      <div className="flex-input-container">
        <div className="input-container">
          <label htmlFor="avgDailyIncome">
            <input
              type="number"
              className="form-control"
              data-avg-daily-income="avgDailyIncome"
              placeholder="Avg Daily Income (USD)"
              value={avgDailyIncome}
              id="avgDailyIncome"
              required
              onChange={handleUpdate}
            />
          </label>
        </div>

        <div className="input-container">
          <label htmlFor="avgIncomePopulation">
            <input
              type="number"
              className="form-control"
              data-avg-income-population="avgIncomePopulation"
              placeholder="Avg Income Population"
              value={avgIncomePopulation}
              id="avgIncomePopulation"
              required
              onChange={handleUpdate}
            />
          </label>
        </div>
      </div>

      <div className="flex-input-container">
        <div className="input-container">
          <label htmlFor="time-to-elapse"></label>
          <input
            type="number"
            className="form-control"
            data-time-to-elapse="timeToElapse"
            placeholder="Time to Elapse"
            value={timeToElapse}
            id="time-to-elapse"
            required
            onChange={handleUpdate}
          />
        </div>

        <div className="input-container">
          <label htmlFor="period-type">
            <select
              className="form-control"
              data-period-type="periodType"
              value={periodType}
              id="period-type"
              required
              onChange={handleUpdate}
            >
              <option value="Days">Days</option>
              <option value="Weeks">Weeks</option>
              <option value="Months">Months</option>
            </select>
          </label>
        </div>
      </div>

      <div className="button-container">
        <button type="submit" data-go-estimate="" className="button">
          Check Estimate
        </button>
      </div>
    </form>
  );
};

export { Form as default };
