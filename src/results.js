/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import sick from './Images/sick.webp';
import ICU from './Images/ICU.png';
import USD from './Images/usd.png';
import VNT from './Images/VNT.webp';
import BED from './Images/BED.png';
import SVC from './Images/SVC.png';

const Results = ({ result: { impact = {}, severeImpact = {} } = {}, data = {} }) => {
  const { periodType, timeToElapse } = data;
  const [swapResult, setSwapResult] = useState(false);

  const result = !swapResult ? impact : severeImpact;

  return (
    <>
      <div className="swap-header">
        <div
          className="left"
          onClick={() => setSwapResult(false)}
          style={{ background: swapResult ? 'transparent' : 'skyblue' }}
        >
          Best Case Senario
        </div>
        <div
          className="right"
          onClick={() => setSwapResult(true)}
          style={{ background: !swapResult ? 'transparent' : 'skyblue' }}
        >
          Worst Case Senario
        </div>
      </div>
      <div className="result">
        <p className="result-header">Recent studies showed that there may actually be up to {result.currentlyInfected} uncomfirmed cases</p>
        <p className="info">
          In about {timeToElapse} {periodType}, there will be:
        </p>
        <div>
          <ul className="list-container">
            <li>
              <img src={sick} alt="" height="70px" width="70px" />
              <p>{result.infectionsByRequestedTime}</p>
              <p>Unconfirmed <br/> Positive Cases</p>
            </li>
            <li>
              <img src={BED} alt="" height="70px" width="70px" />
              <p>{result.hospitalBedsByRequestedTime}</p>
              <p>Available <br /> Hospital Beds</p>
            </li>
            <li>
              <img src={SVC} alt="" height="70px" width="70px" />
              <p>{result.severeCasesByRequestedTime}</p>
              <p>Severe Cases</p>
            </li>
            <li>
              <img src={ICU} alt="" height="70px" width="70px" />
              <p>{result.casesForICUByRequestedTime}</p>
              <p>Patients <br/> Requiring <br/> Intensive Case</p>
            </li>
            <li>
              <img src={VNT} alt="" height="70px" width="70px" />
              <p>{result.casesForVentilatorsByRequestedTime}</p>
              <p>Patients <br/> Requiring <br/> Ventilators</p>
            </li>
            <li>
              <img src={USD} alt="" height="70px" width="70px" />
              <p>{result.dollarsInFlight}</p>
              <p>Dollars <br/> Lost During <br/> this period.</p>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export { Results as default };
