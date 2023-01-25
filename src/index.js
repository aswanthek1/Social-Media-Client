import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./Redux/Store";

const App = lazy(() => import("./App"));
// import App from './App';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Suspense fallback={<h3>Loading.....</h3>}>
        <App />
      </Suspense>
    </Provider>
  </React.StrictMode>
);
