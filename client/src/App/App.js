import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Routes from '../Routes';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement
} from 'chart.js';
import { makeStyles } from "@material-ui/core";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
);

const useStyles = makeStyles(() => ({
  App: {
    textAlign: 'center'
  }
}));

function App() {

  const classes = useStyles();
  
  return (

    <div className={classes.App}>

      <Routes />

      <ToastContainer />
        
    </div>
  );
}

export default App;
