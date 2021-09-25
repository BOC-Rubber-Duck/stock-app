/* eslint-disable react/prop-types */
import React from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import {getGraphOptions} from './helpers/getGraphOptions.js';

const Graph = (props) => {
  const options = getGraphOptions(props.data);
  if (props.data) {
    return (
      <div role='graph'>
        <HighchartsReact
          highcharts={Highcharts}
          constructorType={'stockChart'}
          options={options}
          className='stock-graph'
          role='graph'
        />
      </div>
    );
  }
  return null;
};

export default Graph;