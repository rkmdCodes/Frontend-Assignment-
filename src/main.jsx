import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import DataProvider from "./contex/DataProvider.jsx";

const client = new ApolloClient({
  uri: "https://api.ss.dev/resource/api",
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
  <DataProvider>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
    </DataProvider>
  </React.StrictMode>
);
