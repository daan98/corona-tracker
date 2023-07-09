import React from 'react';
import { Grid, Typography, Card, CardContent } from '@mui/material';
import CountUp from 'react-countup';
import CX from "classname";

import style  from "./CardsInfo.module.css";

const CardsInfo = ({title, date, realData, briefDescription, cardOwnStyle}) => {

  const getCardOwnStyle = () => {
    switch (cardOwnStyle) {
      case "infected":
        return style.infected;
        break;

      case "hospitalized":
        return style.hospitalized;
        break;

      case "deaths":
        return style.deaths;
        break;

      default:
        return null;
    }
  };

  return (
        <Grid item component={Card} xs={12} md={3} className={CX([style.card, getCardOwnStyle()])} >
          <CardContent>
            <Typography color="textSecondary" gutterBottom>{ title }</Typography>
            {realData ?
                <Typography variant='h5'>
                    <CountUp start={0} end={realData} separator=',' duration={2} />
                </Typography>
              :
                <Typography variant='h5'>ND</Typography>
            }
            <Typography color="textSecondary">{ new Date(date).toDateString() }</Typography>
            <Typography variant='body2'>{ briefDescription }</Typography>
          </CardContent>
        </Grid>
  )
}

export default CardsInfo