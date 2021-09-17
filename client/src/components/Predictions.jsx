import React from 'react';
import { Link } from 'react-router-dom';

import {Link} from 'react-router-dom';

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
<<<<<<< HEAD
      //<Link to='/stock-detail-page'>
        <Prediction key={i} data={prediction} predictionClick={props.predictionClick}/>
      //</Link>
=======
      <Link to="/stock-detail-page">
      <Prediction key={i} data={prediction} predictionClick={props.predictionClick}/>
      </Link>
>>>>>>> 3d3eab71d706dce1c74a86301d7fc72d3113d220
    );
  });
};

export default Predictions;