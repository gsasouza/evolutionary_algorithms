import React from "react";
import {
  LineChart,
  ResponsiveContainer,
  Line,
  ReferenceLine,
  ReferenceDot,
  CartesianGrid,
  XAxis,
  YAxis
} from "recharts";
import {
  generateChartData,
  executeIteration,
  TEST_FUNCTION
} from "./algorithms";

import "./app.css";

const data = generateChartData();

const INTERVAL = 50;

const useValues = () => {
  const [years, setYears] = React.useState(0);
  const [bestValue, setBest] = React.useState(null);
  const [population, setPopulation] = React.useState([]);
  const [lastValues, setLastValues] = React.useState([]);

  const execute = React.useCallback(data => {
    const result = executeIteration(data);
    const bestValueIndividual = result.population[result.bestResultIndex];
    setBest(bestValueIndividual);
    setYears(result.years);
    setLastValues(value => [
      ...value,
      {
        value: TEST_FUNCTION(bestValueIndividual).toFixed(4),
        name: result.years
      }
    ]);
    setPopulation(
      result.population.filter((_, i) => i !== result.bestResultIndex)
    );
    setTimeout(() => execute(result), INTERVAL);
  }, []);

  React.useEffect(() => {
    execute();
  }, [execute]);

  return {
    years,
    bestValue,
    population,
    lastValues
  };
};

function App() {
  const { years, bestValue, lastValues, population } = useValues();
  return (
    <>
      <div className="container">
        <h1>Algoritimos Evolutivos</h1>
        <div className="label-container">
          {/*<h2 className="label">{`Iterações: ${years}`}</h2>*/}
          <h2 className="label">{`Máximo valor atual: ${TEST_FUNCTION(
            bestValue
          ).toFixed(4)}`}</h2>
        </div>
        <ResponsiveContainer aspect={6}>
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <Line
              type="monotone"
              dataKey="value"
              stroke="#8884d8"
              dot={false}
              isAnimationActive={false}
            />
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            {bestValue && (
              <ReferenceLine x={Math.round(bestValue)} stroke="#DB001C" />
            )}
            {bestValue && (
              <ReferenceDot
                r={5}
                fill="#DB001C"
                stroke="#000"
                y={-30}
                x={Math.round(bestValue)}
              />
            )}
            {population.map((individual, index) => (
              <ReferenceDot
                r={4}
                fill="#71c842"
                stroke="#71c842"
                y={-30}
                key={index}
                x={Math.round(individual)}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="container">
        <div className="label-container">
          <h2 className="label">{`Iterações: ${years}`}</h2>
          {/*<h2 className="label">{`Máximo valor atual: ${TEST_FUNCTION(*/}
          {/*  bestValue*/}
          {/*).toFixed(4)}`}</h2>*/}
        </div>
        <ResponsiveContainer aspect={6}>
          <LineChart
            data={lastValues}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <Line
              type="monotone"
              dataKey="value"
              stroke="#8884d8"
              dot={false}
              isAnimationActive={false}
            />
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={false}/>
            <YAxis />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}

export default App;
