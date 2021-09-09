import React from 'react';
import Stockbar from './Stockbar.jsx';

const Portfolio = (props) => {
  return (
    <div>
      <Stockbar type='portfolio' symbol='TSLA' name='Tesla, Inc.' value='136.50'/>
      <Stockbar type='portfolio' symbol='STKD' name='Stock Ducks, Inc.' value='236.50'/>
      <Stockbar type='stockSearch' symbol='TSLA' name='Tesla, Inc.'/>
    </div>
  );
};

export default Portfolio;