import { useState, useEffect } from "react";

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
  const [amount, setAmount] = useState(0);
  const [selected, setSelected] = useState("");
  const [price, setPrice] = useState(0);
  const onChange = (event) => {
    setAmount(event.target.value);
  };
  const handleSelected = (event) => {
    setSelected(event.target.value);
    console.log(event.target.price);
  };
  console.log(coins); /* []이거 실행 후 [요소] 생김 실행순서..?*/
  return (
    <div>
      <h1>The Coins!{loading ? "" : `(${coins.length})`}</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <select onChange={handleSelected}>
          <option>Select Coin</option>
          {coins.map((coin, index) => (
            <option key={index} price={coin.quotes.USD.price}>
              {coin.name}({coin.symbol}) : {coin.quotes.USD.price} USD
            </option>
          ))}
        </select>
      )}
      <div>
        USD :{" "}
        <input
          value={amount}
          type={"number"}
          placeholder="0"
          onChange={onChange}
        />
        <button>Exchange</button>
      </div>
      <div>
        {selected
          ? JSON.stringify(selected.match(/\([^)]*\)/)).slice(3, -3)
          : "NONE"}{" "}
        : <input value={amount} type={"number"} placeholder="0" />
      </div>
    </div>
  );
}

export default App;
