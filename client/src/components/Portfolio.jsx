import React from 'react';
import Stockbar from './Stockbar.jsx';
import Usercard from './Usercard.jsx';

const Portfolio = (props) => {
  return (
    <div>
      <Usercard />
      <Stockbar type='stockSearch' symbol='TSLA' name='Tesla, Inc.'/>
      <Stockbar type='stockSearch' symbol='TSLO' name='Toosla, Inc.'/>
      <Stockbar type='portfolio' symbol='STKD' name='Stock Ducks, Inc.' value='236.50'/>
    </div>
  );
};


export default Portfolio;