import React from "react";
import { useQuery } from "relay-hooks";
import graphql from "babel-plugin-relay/macro";
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

import "./app.css";
import NewResultSubscription from "./subscription/NewResultSubscription";
import { getCurve } from "./utils";

const data = getCurve();

const query = graphql`
  query AppQuery {
    results {
      fitness
      generation
      value
      population
      pastResults
      populationResultsMean
    }
  }
`;

function App() {
  React.useEffect(() => {
    NewResultSubscription();
  }, []);
  const { props } = useQuery(
    query,
    {},
    {
      fetchPolicy: "store-or-network", //default
      networkCacheConfig: undefined
    }
  );

  if (!props) return <div>Loading...</div>;

  const { generation, fitness, value, population = [], pastResults, populationResultsMean } = props.results;
  const generationsData = pastResults.map((value, index) => ({ name: index, value, populationMean: populationResultsMean[index] }));

  return (
    <>
      <h1>Algoritimos Evolutivos</h1>

      <div className="container">
        <div className="label-container">
          <h2 className="label">{`Fitness: ${fitness}`}</h2>
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

            <ReferenceLine x={Math.round(value)} stroke="#DB001C" />

            <ReferenceDot
              r={5}
              fill="#DB001C"
              stroke="#000"
              y={-30}
              x={Math.round(value)}
            />
            {population &&
              population.map((individual, index) => (
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
          <h2 className="label">{`Gerações: ${generation}`}</h2>
        </div>
        <ResponsiveContainer aspect={6}>
          <LineChart
            data={generationsData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <Line
              type="monotone"
              dataKey="value"
              stroke="#8884d8"
              dot={false}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="populationMean"
              stroke="#71c842"
              dot={false}
              isAnimationActive={false}
            />
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={false} />
            <YAxis />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}

export default App;
