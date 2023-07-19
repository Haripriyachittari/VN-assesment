import React from "react";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { createRoot } from "react-dom/client";

const apiUrl = process.env.REACT_APP_API_URL;
console.log(apiUrl, "api");

const httpLink = createHttpLink({
  uri: apiUrl,
});

const authLink = setContext((_, { headers }) => {
  const token = process.env.REACT_APP_TOKEN;
  console.log("Token:", token);
  console.log("uri:", apiUrl);
  return {
    headers: {
      authorization: token ? token : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const container = document.getElementById("root");
const rootElement = createRoot(container);
rootElement.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
