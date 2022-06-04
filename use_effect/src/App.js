import { keyboard } from "@testing-library/user-event/dist/keyboard";
import { useEffect, useState } from "react";
function Hello() {
  useEffect(() => {
    console.log("created :)");
    return () => console.log("destroyed :("); /* cleanup function  */
  }, []);
  return <h1>Hello</h1>;
}

function App() {
  const [counter, setValue] = useState(0);
  const [keyword, setKeyword] = useState("");

  const onClick = () => setValue((prev) => prev + 1);
  const onChange = (evnet) => setKeyword(evnet.target.value);
  const [showing, setShowing] = useState(false);
  const isButton = () => setShowing((prev) => !prev);
  useEffect(() => {
    console.log("I run only once.");
  }, []);
  useEffect(() => {
    console.log("I run when 'keyword' changes.");
  }, [keyword]);
  useEffect(() => {
    console.log("I run when 'counter' changes.");
  }, [counter]);
  useEffect(() => {
    console.log("I run when keyword & counter changes.");
  }, [counter, keyboard]);

  return (
    <div>
      <input
        value={keyword}
        type="text"
        onChange={onChange}
        placeholder="Search here..."
      ></input>
      <h1>{counter}</h1>
      <button onClick={onClick}>click me</button>
      <div>
        {showing ? <Hello /> : null}
        <button onClick={isButton}> {showing ? "Hide" : "Show"}</button>
      </div>
    </div>
  );
}

export default App;
