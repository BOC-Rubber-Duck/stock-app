module.exports.formatAPIData = (data) => {
  const formattedData = {
    ohlc: [],
    volume: [],
    dataLength: data.length
  };
  for (let i = 0; i < data.length; i++) {
    formattedData.ohlc.push([
      data[i].date,
      data[i].open,
      data[i].high,
      data[i].low,
      data[i].close
    ]);
    formattedData.volume.push([
      data[i].date,
      data[i].volume
    ]);
  }
  return formattedData;
};