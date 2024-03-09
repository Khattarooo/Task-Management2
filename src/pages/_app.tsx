import { Provider } from "react-redux";
import { AppProps } from "next/app";
import { store, persistor } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react"; // Import PersistGate

import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {" "}
        {/* Wrap Provider with PersistGate */}
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
