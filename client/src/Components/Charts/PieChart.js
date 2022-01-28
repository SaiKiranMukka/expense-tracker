import React from 'react';
import { Pie } from 'react-chartjs-2';

export default function PieChart(props) {

  const { data, options, ...other} = props;
  return (
    <Pie 
      data={data}
      options={options}
      redraw={true}
      fallbackContent={<h6>loading...</h6>}
      {...other}
    />
  )
}
