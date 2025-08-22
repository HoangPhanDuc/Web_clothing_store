import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import './index.css'
import App from "./App.jsx";

// aos css
import "aos/dist/aos.css";
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./index.css";
// Toast css
import "react-toastify/dist/ReactToastify.css";
// Fortawesome
import "@fortawesome/fontawesome-free/css/all.min.css";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store.js";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>
);
