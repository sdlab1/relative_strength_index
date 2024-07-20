#slightly modified by chatgpt4 for better readability on 20 july 2024
import pandas as pd
import numpy as np

def rsi_tradingview(ohlc: pd.DataFrame, period: int = 14):
    """ Implements the RSI indicator as defined by TradingView on March 15, 2021.
        The TradingView code is as follows:
        //@version=4
        study(title="Relative Strength Index", shorttitle="RSI", format=format.price, precision=2, resolution="")
        len = input(14, minval=1, title="Length")
        src = input(close, "Source", type = input.source)
        up = rma(max(change(src), 0), len)
        down = rma(-min(change(src), 0), len)
        rsi = down == 0 ? 100 : up == 0 ? 0 : 100 - (100 / (1 + up / down))
        plot(rsi, "RSI", color=#8E1599)
        band1 = hline(70, "Upper Band", color=#C0C0C0)
        band0 = hline(30, "Lower Band", color=#C0C0C0)
        fill(band1, band0, color=#9915FF, transp=90, title="Background")

    :param ohlc: DataFrame containing OHLC data
    :param period: Lookback period for RSI calculation
    :return: an array with the RSI indicator values
    """

    # Calculate the difference between consecutive closing prices
    delta = ohlc["close"].diff()

    # Calculate the gains (upward changes)
    up = delta.copy()
    up[up < 0] = 0

    # Calculate the losses (downward changes)
    down = delta.copy()
    down[down > 0] = 0
    down *= -1

    # Calculate the simple moving average of gains and losses
    up_avg = up.rolling(window=period, min_periods=1).mean()
    down_avg = down.rolling(window=period, min_periods=1).mean()

    # Calculate the Relative Strength (RS)
    rs = up_avg / down_avg

    # Calculate the RSI
    rsi = 100 - (100 / (1 + rs))

    # Return the RSI values rounded to 2 decimal places
    return np.round(rsi, 2)
