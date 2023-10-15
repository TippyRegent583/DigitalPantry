import React, { useState, PureComponent } from 'react';
import { BarChart, Bar, YAxis } from 'recharts';

export default class Graph extends PureComponent {
  render() {
    const [data, setData] = useState([])
    setData([
        {name: 1, cost: 133},
        {name: 2, cost: 167},
        {name: 3, cost: 111},
        {name: 4, cost: 78},
        {name: 5, cost: 187}]);

    return (
        <BarChart width={500} height={300} data={data}>
          <Bar dataKey="cost" fill="#8884d8" stroke="#000" strokeWidth={2} />
          <YAxis dataKey = "cost" label={{ value: 'Totals $', angle: -90, position: 'insideLeft' }} />
        </BarChart>
      );
  }
}