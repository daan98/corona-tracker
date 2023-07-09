import React, { useEffect, useState } from 'react';
import { Chart, Cards, StatePicker } from "./components";
import { fetchSingleStateData, fetchCurrentData } from "./api";
import coronaImage from './img/image.png';


const App = () => {
  const [apiUrl, setApiUrl] = useState('https://api.covidtracking.com/v1/us/current.json');//STATES: https://api.covidtracking.com/v1/states/info.json SINGLE_STATE:https://api.covidtracking.com/v1/states/ca/current.json
  const [urlData, setUrlData] = useState();
  const [selectedState, setSelectedState] = useState('USA');
  const [selectedStateInfo, setSelectedStateInfo] = useState({postive: null, hospitalizedCurrently: null, death: null, state: null});

  useEffect(() => {
    /* fetch(apiUrl)
    .then(response => response.json())
    .then(data => setUrlData(data)); */

    const fetchMainData = async () => {
      setUrlData( await fetchCurrentData(apiUrl));
    }
    fetchMainData();
  }, [apiUrl]);

  useEffect(() => {
    const fetchSingleStateApi = async () => {
      setSelectedStateInfo(await fetchSingleStateData(selectedState));
    };

    if (selectedState === '' || selectedState === 'usa') {
      setSelectedStateInfo({postive: null, hospitalizedCurrently: null, death: null, state: null});
      return;
    } else {
      fetchSingleStateApi();
    }
  }, [selectedState]);

  const handleOnSelectedState = async (state) => {
    console.log('handleOnSelectedState: ', state);
    //await fetchSingleStateData();
    setSelectedState(state);
  }
  return (
    <div className='container'>
      <img src={coronaImage} alt="COVID-19 tracker image" className="image" />
      <Cards data={urlData}/>
      <StatePicker handleOnSelectedState={handleOnSelectedState} />
      <Chart selectedStateInfo={selectedStateInfo} />
    </div>
  )
}

export default App