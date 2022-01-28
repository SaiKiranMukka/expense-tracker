import React, { useEffect, useState } from 'react';
import BarChart from '../Charts/BarChart';
import * as dashboardService from '../../Services/dashboard.service';
import LineChart from '../Charts/LineChart';
import PieChart from '../Charts/PieChart';
import { Skeleton } from '@material-ui/lab';
import StatsView from '../Charts/StatsView';
import { Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    [theme.breakpoints.up('xs')]: {
      paddingTop: theme.spacing(5)
    },
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(0, 1.25)
    },
    [theme.breakpoints.up('lg')]: {
      padding: theme.spacing(10, 3.25, 2)
    },
  },
}))


export default function Dashboard() {

  const [statsInfo, setStatsInfo] = useState([]);
  const [barInfo, setBarInfo] = useState([]);
  const [lineInfo, setLineInfo] = useState([])
  const [pieInfo, setPieInfo] = useState([])
  const [creditInfo, setCreditInfo] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const classes = useStyles();

  const dashboardData = async () => {

    const [data, data1, data2, data3, creditCardData] = await Promise.all([
      dashboardService.getStatsData(),
      dashboardService.getDashboardData(),
      dashboardService.getLineData(),
      dashboardService.getPieData(),
      dashboardService.getCreditCardData()
    ])

    setStatsInfo(data);
    setBarInfo(data1);
    setLineInfo(data2);
    setPieInfo(data3);
    setCreditInfo(creditCardData);
    setIsLoading(false);
  }

  useEffect(() => {
    dashboardData();
  }, [])

  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Category Wise Utilization - Last 6 months',
      },
    },
    responsive: true,
    // interaction: {
    //   mode: 'index',
    //   intersect: false,
    // },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  const lineoptions = {
    plugins: {
      title: {
        display: true,
        text: 'Category Wise Utilization - Last 7 days',
      },
      // legend: {
      //   position: 'top',
      // }
    },
    responsive: true,
  };

  const pieoptions = {
    plugins: {
      title: {
        display: true,
        text: 'Payment Mode Wise Utlization',
      },
      datalabels: {
        formatter: (value, ctx) => {
          let datasets = ctx.chart.data.datasets;
          let percentage = 120;

          if (datasets.indexOf(ctx.dataset) === datasets.length - 1) {
            let sum = datasets[0].data.reduce((a, b) => a + b, 0);
            percentage = Math.round((value / sum) * 100) + "%";
            return percentage;
          } else {
            return percentage;
          }
        },
        color: "black"
      }
    },

    responsive: true,
  };

  const creditOptions = {
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Credit Card Utilization',
      },
    },
  }


  return (
    <>
      <h1>Dashboard</h1>
      <Grid container justifyContent="center">
        {
          statsInfo.map(
            item => {
              return (
                <Grid item xs={12} sm={6} md={3} key={item.category}>
                  <StatsView title={item.category} value={item.totalAmount} />
                </Grid>
              )
            }
          )
        }
      </Grid>

      <Grid container justifyContent="center">

        <Grid item xs={12} sm={10} md={8} lg={6} className={classes.root} >
          {
            !isLoading ?
              <BarChart options={options} data={barInfo} /> :
              <>
                <h6> Loading... </h6>
                <Skeleton variant="rect" height={200} />
              </>
          }
        </Grid>

        <Grid item xs={12} sm={10} md={8} lg={6} className={classes.root} >
          {
            !isLoading ?
              <LineChart options={lineoptions} data={lineInfo} /> :
              <>
                <h6> Loading... </h6>
                <Skeleton variant="rect" height={200} />
              </>
          }
        </Grid>

        <Grid item xs={12} sm={8} md={6} lg={4} className={classes.root} >
          {
            !isLoading ?
              <PieChart options={pieoptions} data={pieInfo} /> :
              <>
                <h6> Loading... </h6>
                <Skeleton variant="rect" height={200} />
              </>
          }
        </Grid>

        <Grid item xs={12} sm={10} md={8} lg={6} className={classes.root} >
          {
            !isLoading ?
              <BarChart options={creditOptions} data={creditInfo} /> :
              <>
                <h6> Loading... </h6>
                <Skeleton variant="rect" height={200} />
              </>
          }
        </Grid>

      </Grid>

    </>
  )
}
