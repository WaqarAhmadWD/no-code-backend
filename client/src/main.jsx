import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store/store.js";
import "./index.css";
import App from "./App.jsx";
function hidePreloader() {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    preloader.parentNode.removeChild(preloader);
  }
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
  </StrictMode>
);
hidePreloader();