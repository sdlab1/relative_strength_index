function rsiTradingView(ohlcv, period = 14){
  // Initialize arrays for gains and losses
  const up = [];
  const down = [];

  // Calculate the gains and losses
  for (let i = 1; i < ohlcv.length; i++) {
    const change = ohlcv[i].close - ohlcv[i - 1].close;
    if (change >= 0) {
      up.push(change);
      down.push(Number.MIN_VALUE); // Use Number.MIN_VALUE for losses
    } else {
      up.push(Number.MIN_VALUE); // Use Number.MIN_VALUE for gains
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
  const rs = upRma.map((value, index) => value / downRma[index]);

  // Calculate the RSI
  const rsi = rs.map(value => 100 - 100 / (1 + value));

  // Return the RSI values rounded to 2 decimal places
  return rsi.map(value => +(Math.round(value * 100) / 100).toFixed(2));
}

