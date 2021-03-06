module.exports.formatAPIData = (data) => {
  const formattedData = {
    ohlc: [],
    volume: [],
    dataLength: data.length
  };
  for (let i = 0; i < data.length; i++) {
    const dateUnix = new Date(data[i].date).getTime();
    formattedData.ohlc.unshift([
      dateUnix,
      data[i].open,
      data[i].high,
      data[i].low,
      data[i].close
    ]);
    formattedData.volume.unshift([
      dateUnix,
      data[i].volume
    ]);
  }
  return formattedData;
};