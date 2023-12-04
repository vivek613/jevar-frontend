import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store, { persistor } from "./Stores/store";
import { PersistGate } from "redux-persist/integration/react";
import Loader from "./Component/loader";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
      <Loader />
    </PersistGate>
  </Provider>
);
reportWebVitals();
