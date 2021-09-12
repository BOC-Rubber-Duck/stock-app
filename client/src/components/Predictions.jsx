import React from 'react';

const Prediction = (props) => {
  return (
    <div
      className='searchbar-prediction-display'
      value={props.data.symbol}
      onClick={() => props.predictionClick(props.data.symbol)}>
      <h3 className='searchbar-prediction-symbol'>
        {props.data.symbol}
      </h3>
      <p className='searchbar-prediction-title'>
        {props.data.name}
      </p>
    </div>
  );
};

const Predictions = (props) => {
  return props.predictions.map((prediction, i) => {
    return (
      <Prediction key={i} data={prediction} predictionClick={props.predictionClick}/>
    );
  });
};

export default Predictions;