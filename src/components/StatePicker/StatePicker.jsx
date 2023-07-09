import { useEffect, useState } from 'react';
import { NativeSelect, FormControl } from '@mui/material';
import CX from 'classname';
import { fetchStates } from '../../api';

import style from "./StatePicker.module.css";


const StatePicker = ({ handleOnSelectedState }) => {
  const [states, setStates] = useState([]);

  useEffect(() => {
    const fetchAPIStates = async () => {  
      setStates(await fetchStates());
    };

    fetchAPIStates();
  }, []);

  return (
    <FormControl className={CX([style.FormControl])}>
      <NativeSelect defaultValue={''} onChange={(e) => handleOnSelectedState(e.target.value.toLowerCase())}>
        {states.length > 0 ?
        states.map((state, index) => (
          <option key={index} value={state.state}>{state.name} - {state.state}</option>
        ))
        :
        null
      }
      </NativeSelect>
    </FormControl>
  ); 
};

export default StatePicker;