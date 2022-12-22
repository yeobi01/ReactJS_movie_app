import { useState, useEffect } from "react";

function Converter(props) {

  const [dol, setDol] = useState(0);
  const onChange = (event) => { setDol(event.target.value) };
  return (
    <div>
      <input 
        onChange={onChange}
        id = "dollars"
        placeholder = "Input Your Dollars"
        type = "number"
      />
      <h4>{dol/(props.coinPrice)} {props.coinSymbol}</h4>
    </div>
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);

  const [nowCoin, setNowCoin] = useState("Bitcoin");
  const onChange = (event) => setNowCoin(event.target.value);
  
  return (
    <div>
      <h1>Coin Top {coins.length}</h1>
      {loading ? <strong>Loading...</strong> : (
        <div>
          <select value={nowCoin} onChange={onChange}>
            {coins.map((coin) => (
              <option value={coin.name}>{coin.name} ({coin.symbol}) </option>
            ))}
          </select>
          <hr />
          {coins.map((coin) => (
            ( coin.name === nowCoin ? <Converter coinSymbol = {coin.symbol} coinPrice={coin.quotes.USD.price} /> : null )
          ))}
        </div>
      )}
    </div>
  );
}// {coin.quotes.USD.price}

export default App;