import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ApiMock } from "./ApiMock";
import reportWebVitals from "./reportWebVitals";

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <React.StrictMode>
      <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
        <App Api={ApiMock} />
      </div>
    </React.StrictMode>
  );
} else {
  const renderRoot = ({ api, divId }) => {
    const root = ReactDOM.createRoot(document.getElementById(divId));
    
    let additionalArguments = document.currentScript.getAttribute("additionalArguments");

    if(additionalArguments){
      additionalArguments = JSON.parse(additionalArguments);
    }

    root.render(
      <React.StrictMode>
        <App Api={api} additionalArguments={additionalArguments} />
      </React.StrictMode>
    );
  };

  let divId = document.currentScript.getAttribute("divId");
  let cardId = document.currentScript.getAttribute("cardId");
  
  window.CreateCardAPI(cardId).then((api) => {
    renderRoot({ api, divId });
  });
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
