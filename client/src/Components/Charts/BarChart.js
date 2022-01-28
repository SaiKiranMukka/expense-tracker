import React from 'react';
import { Bar } from "react-chartjs-2";

export default function BarChart(props) {

  const { data, options, ...other} = props;

  return (
    <Bar
      data={data}
      options={options}
      redraw={true}
      fallbackContent={<h6>loading...</h6>}
      {...other}
    />
  )
}
