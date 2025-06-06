import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./assets/styles/icons/icons.css";
import "./assets/styles/dark.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);
