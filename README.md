# relative_strength_index

Relative Strength Index workspace

source: https://github.com/lukaszbinden/rsi_tradingview/blob/main/rsi.py

converting to javascript

```
pine_sma(x, y) =>
    sum = 0.0
    for i = 0 to y - 1
        sum := sum + x[i] / y
    sum
pine_rma(src, length) =>
  alpha = 1/length
  sum = 0.0
  sum := na(sum[1]) ? 
    pine_sma(src, length) : 
    alpha * src + (1 - alpha) * nz(sum[1])
  sum
pine_rsi(x, y) =>
    u = math.max(x - x[1], 0) // upward ta.change
    d = math.max(x[1] - x, 0) // downward ta.change
    rs = pine_rma(u, y) / pine_rma(d, y)
    res = 100 - 100 / (1 + rs)
    res
```
