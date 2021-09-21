import React from 'react';

import {Link} from 'react-router-dom';

const Prediction = (props) => {
  return (
    <div
      className='searchbar-prediction-display'
      value={props.data.symbol}
      onClick={() => props.predictionClick(props.data.symbol)}>
      <span className='searchbar-prediction-symbol'>
        {props.data.symbol}
      </span>
      <span className='searchbar-prediction-title'>
        {props.data.name}
      </span>
    </div>
  );
};

const Predictions = (props) => {
  return props.predictions.map((prediction, i) => {
    return (
      //<Link to='/stock-detail-page'>
        <Prediction key={i} data={prediction} predictionClick={props.predictionClick}/>
      //</Link>
    );
  });
};

export default Predictions;