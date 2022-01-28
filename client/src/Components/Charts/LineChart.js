import React from 'react';
import { Line } from "react-chartjs-2";

export default function LineChart(props) {

  const { data, options, ...other} = props;

  return (
    <Line
      data={data}
      options={options}
      redraw={true}
      fallbackContent={<h6>loading...</h6>}
      {...other}
    />
  )
}