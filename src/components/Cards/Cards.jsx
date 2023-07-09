import React from 'react';
import { Grid,  } from "@mui/material";
import CardsInfo from '../CardsInfo/CardsInfo';
import CX from "classname";

import style from './Cards.module.css';

const Cards = ({data}) => {
  if(!data) {
    return "Loading...";
  }
  
  const { dateChecked, death, positive, hospitalized } = data[0];

  const getDate = () => {
    return new Date(dateChecked).toDateString();
  };

  return (
    <div className={CX(style.cardsContainer)}>
      <Grid container justifyContent="center" className={CX([style.cardsGrid])} >
        <CardsInfo title="Infected" realData={positive} date={getDate()} cardOwnStyle="infected" briefDescription="Number of active cases of COVID-19" />
        <CardsInfo title="Hospitalized" realData={hospitalized} date={getDate()} cardOwnStyle="hospitalized" briefDescription="Number of hospitalized from COVID-19" />
        <CardsInfo title="Deaths" realData={death} date={getDate()} cardOwnStyle="deaths" briefDescription="Number of deths from COVID-19" />
      </Grid>
    </div>
  );
};

export default Cards;