function rsi(ohlcv, period = 14){
  // Initialize arrays for gains and losses
  const up = [];
  const down = [];

  // Calculate the gains and losses
  for (let i = 1; i < ohlcv.length; i++) { //branchless; Number.MIN_VALUE as zero
    const change = ohlcv[i].close - ohlcv[i - 1].close;
    const upValue = Math.max(change, Number.MIN_VALUE); // Equivalent to if (change >= 0) { change } else { Number.MIN_VALUE }
    const downValue = Math.max(-change, Number.MIN_VALUE); // Equivalent to if (change < 0) { -change } else { Number.MIN_VALUE }
    up.push(upValue);
    down.push(downValue);
  }
  
  function rma(values, period){
    const alpha = 1 / period;
    const rmaArray = [];
    rmaArray.push(values.slice(0, period).reduce((acc, val) => acc + val, 0) / period);
    for (let i = period; i < values.length; i++)
      rmaArray.push(alpha * values[i] + (1 - alpha) * rmaArray[rmaArray.length-1]);
    return rmaArray;
  }

  // Calculate the RMA of gains and losses
  const upRma = rma(up, period);
  const downRma = rma(down, period);

  // Calculate the Relative Strength Index
  const rsi = upRma.map((value, index) => 100 - 100 / (1 + (value / downRma[index]) ));

  // Return the RSI values rounded to 2 decimal places
  return rsi.map(value => Math.round((value + Number.EPSILON) * 100) / 100);
}

