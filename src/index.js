import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import CalculatorGame from "./components/CalculatorGame";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<CalculatorGame />, document.getElementById("root"));
registerServiceWorker();
console.log(
  "%c%s",
  "color: black; font-size: 24px;",
  "Developed by Jorge Rubiano https://twitter.com/ostjh"
);
