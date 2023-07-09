import {useState, useEffect} from 'react';
import { fetchDailyData } from "../../api";
import { Line, Bar } from 'react-chartjs-2';
import { 
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Filler
} from "chart.js";
import CX from 'classname';

import style from "./Chart.module.css";

const Chart = ({ selectedStateInfo }) => {
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    const fetApiData = async () => {
      const originalDailyData = await fetchDailyData();
      let modifiedDailyData = [];

      originalDailyData.map( data => {
        modifiedDailyData.unshift(data);
      });

      setDailyData(modifiedDailyData);
    };

    fetApiData();
  }, []);

  ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Filler
  );

  const lineChart = (
    dailyData.length > 0 && dailyData[0] ?
    (
      <Line
        data={{
                labels: dailyData.map(({ dateChecked }) => { return new Date(dateChecked).toDateString() }),
                datasets: [{
                  data: dailyData.map(({ positive }) => positive), 
                  label: 'Total Infected',
                  borderColor: "#3333ff",
                  fill: true,
                }, {
                  data: dailyData.map(({ death }) => death), 
                  label: 'Total Deaths',
                  borderColor: "red",
                  backgroundColor: "rgba(255, 0, 0, 0.5)",
                  fill: true,
                }, {
                  data: dailyData.map(({ hospitalized }) => hospitalized), 
                  label: 'Total Hospitalized',
                  borderColor: "rgb(255, 140, 0)",
                  backgroundColor: "rgba(255, 140, 0, 0.5)",
                  fill: true,
                }]
              }}
      />
    ) : null
  );

  //console.log("CHARTS positive, hospitalizedCurrently, death, state: ", positive, hospitalizedCurrently, death, state);
  console.log('selectedStateInfo: ', selectedStateInfo);
  const barChart = (
    selectedStateInfo.positive ?
    (
      <Bar
        data={{
          labels: ['Infected', 'Deaths'],
          datasets: [{
            data: [selectedStateInfo.positive, selectedStateInfo.death],
            label: "People",
            backgroundColor: ["rgba(0, 0, 255, 0.5)", "rgba(255, 0, 0, 0.5)"],
          }]
        }}
        options={{
          legend: { display: false },
          title: { display: true, text: `State in ${selectedStateInfo.state}` }
        }}
      />
    ) : null
  );
  console.log('barChart: ', barChart);

  return (
    <div className={CX([style.chartContainer])}>
      { barChart ? barChart : lineChart }
    </div>
  );
};

export default Chart;