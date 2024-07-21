function rma(values, period){
    const alpha = 1 / period;
    const rmaArray = [];
    rmaArray.push(values.slice(0, period).reduce((acc, val) => acc + val, 0) / period);
    for (let i = period; i < values.length; i++)
      rmaArray.push(alpha * values[i] + (1 - alpha) * rmaArray[rmaArray.length-1]);
    return rmaArray;
  }
// in basic.js:
export function rma(arr, period) { //running moving average
	const arrout = [];
	arrout[0] = 0;
	for(let i = 0; i < period; i++)
	arrout[0] += arr[i];
	arrout[0] /= period; //1st sma value
	for(let i = period, j = 1, alpha = 1 / period; i < arr.length; i++, j++)
		arrout[j] = arr[i] * alpha + (1 - alpha) * arrout[j-1];
	return arrout;
}
function mathmx(arg1, arg2) { 
  //since we have only 2 args and 1 is for sure greater
  //and both are numbers no need for Math.max. This is the way.
  if (arg2 > arg1) return arg2;
  return arg1;
}
function rsi(ohlcv, period = 14){
  // Initialize arrays for gains and losses
  const up = [];
  const down = [];

  // Calculate the gains and losses
  for (let i = 1; i < ohlcv.length; i++) { //Number.MIN_VALUE as zero
    const change = ohlcv[i].close - ohlcv[i - 1].close;
	up.push( mathmx(change, Number.MIN_VALUE) );
	down.push( mathmx(-change, Number.MIN_VALUE) );
  }
  // Calculate the RMA of gains and losses
  const upRma = rma(up, period);
  const downRma = rma(down, period);

  // Calculate the Relative Strength Index
  const rsi = upRma.map((value, index) => 100 - 100 / (1 + (value / downRma[index]) ));

  // Return the RSI values rounded to 2 decimal places
  return rsi.map(value => Math.round((value + Number.EPSILON) * 100) / 100);
}

