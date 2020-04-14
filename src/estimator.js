const calcPercentOf = (percent) => (record) => (parseFloat(percent) * record) / 100;

const getInfectionsByRequestedTime = (currentlyInfected, days) => {
  const factor = Math.trunc(days / 3);
  return currentlyInfected * (2 ** factor);
};

const periodTypeFormater = (period, timePeriod) => {
  const formater = {
    DAYS: (days) => days,
    WEEKS: (weeks) => weeks * 7,
    MONTHS: (months) => months * 30
  };
  return formater[period.toUpperCase()](timePeriod);
};

const Estimator = (input) => ({ currentlyInfectedEstimatorFactor = 10 } = {}) => {
  const {
    region: { avgDailyIncomeInUSD, avgDailyIncomePopulation },
    reportedCases, totalHospitalBeds,
    timeToElapse, periodType
  } = input;

  const newTimeToElapse = periodTypeFormater(periodType, timeToElapse);

  const currentlyInfected = reportedCases * currentlyInfectedEstimatorFactor;

  const infectionsByRequestedTime = getInfectionsByRequestedTime(
    currentlyInfected, newTimeToElapse
  );

  const severeCasesByRequestedTime = Math.trunc(calcPercentOf('15%')(infectionsByRequestedTime));

  const hospitalBedsByRequestedTime = Math.trunc(calcPercentOf('35%')(totalHospitalBeds) - severeCasesByRequestedTime);

  const casesForICUByRequestedTime = Math.trunc(calcPercentOf('5%')(infectionsByRequestedTime));

  const casesForVentilatorsByRequestedTime = Math.trunc(calcPercentOf('2%')(infectionsByRequestedTime));

  const dollarsInFlight = Math.trunc((
    infectionsByRequestedTime * avgDailyIncomePopulation * avgDailyIncomeInUSD) / newTimeToElapse);

  return {
    currentlyInfected,
    infectionsByRequestedTime,
    severeCasesByRequestedTime,
    hospitalBedsByRequestedTime,
    casesForICUByRequestedTime,
    casesForVentilatorsByRequestedTime,
    dollarsInFlight
  };
};

const covid19ImpactEstimator = (data) => {
  const output = Estimator(data);
  const impact = output();
  const severeImpact = output({ currentlyInfectedEstimatorFactor: 50 });

  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
