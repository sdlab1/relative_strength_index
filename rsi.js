function rsiTradingView(ohlcv, period = 14){
  // Initialize arrays for gains and losses
  const up = [];
  const down = [];

  // Calculate the gains and losses
  for (let i = 1; i < ohlcv.length; i++) {
    const change = ohlcv[i].close - ohlcv[i - 1].close;
    if (change >= 0) {
      up.push(change);
      down.push(0);
    } else {
      up.push(0);
      down.push(-change);
    }
  }
  
  // Helper function to calculate the RMA
  const rma = (values, period) => {
    const alpha = 1 / period;
    const rmaArray = [];
    let prevRma = values.slice(0, period).reduce((acc, val) => acc + val, 0) / period;
    rmaArray.push(prevRma);

    for (let i = period; i < values.length; i++) {
      const newRma = alpha * values[i] + (1 - alpha) * prevRma;
      rmaArray.push(newRma);
      prevRma = newRma;
    }

    return rmaArray;
  };

  // Calculate the RMA of gains and losses
  const upRma = rma(up, period);
  const downRma = rma(down, period);

  // Calculate the Relative Strength (RS) and handle division by zero
  const rs = upRma.map((value, index) => downRma[index] === 0 ? 0 : value / downRma[index]);

  // Calculate the RSI
  const rsi = rs.map(value => 100 - 100 / (1 + value));

  // Return the RSI values rounded to 2 decimal places
  return rsi.map(value => +(Math.round(value * 100) / 100).toFixed(2));
}

// Example usage
const closingPrices = [45.34, 46.12, 45.77, 46.89, 47.09, 46.88, 47.34, 47.77, 47.12, 46.88, 47.22, 46.88, 47.34, 47.77, 47.12, 46.88, 47.22];
const period = 14;
const rsiValues = rsiTradingView(ohlcv, period);
console.log(rsiValues);
