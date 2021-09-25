module.exports.getGraphOptions = (data) => {
  const options = {
    yAxis: [{
      labels: {
        align: 'left',
        format: '${text}'
      },
      height: '80%',
      resize: {
        enabled: true
      }
    }, {
      labels: {
        align: 'left'
      },
      top: '80%',
      height: '20%',
      offset: 0
    }],
    tooltip: {
      valuePrefix: '$',
      shape: 'square',
      headerShape: 'callout',
      borderWidth: 0,
      shadow: false,
      positioner: function(width, height, point) {
        const chart = this.chart;
        let position;

        if (point.isHeader) {
          position = {
            x: Math.max(
              // Left side limit
              chart.plotLeft,
              Math.min(
                point.plotX + chart.plotLeft - width / 2,
                // Right side limit
                chart.chartWidth - width - chart.marginRight
              )
            ),
            y: point.plotY
          };
        } else {
          position = {
            x: point.series.chart.plotLeft,
            y: point.series.yAxis.top - chart.plotTop
          };
        }

        return position;
      }
    },
    series: [{
      type: 'ohlc',
      id: 'aapl-ohlc',
      name: 'AAPL Stock Price',
      data: data.ohlc,
    },
    // {
    //   type: 'column',
    //   id: 'aapl-volume',
    //   name: 'AAPL Volume',
    //   data: data.volume,
    //   yAxis: 1,
    // }
    ],
    scrollbar: {
      barBackgroundColor: 'linear-gradient(0deg, rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0.75))',
      barBorderRadius: 7,
      buttonBackgroundColor: '#F5F5F5',
      buttonBorderWidth: 0,
      buttonArrowColor: 'black',
      buttonBorderRadius: 7,
      rifleColor: 'white',
      trackBackgroundColor: 'white',
      trackBorderWidth: 1,
      trackBorderColor: 'silver',
      trackBorderRadius: 7,
      height: 15,
    }
  };
  return options;
};