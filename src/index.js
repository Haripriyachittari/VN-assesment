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
// Get the API URL from environment variable
const apiUrl = process.env.REACT_APP_API_URL;
console.log(apiUrl, "api");

// Create a HTTP link to the GraphQL server
const httpLink = createHttpLink({
  uri: apiUrl,
});

// Create an authentication link to add the token to the header of each request
const authLink = setContext((_, { headers }) => {
  const token = process.env.REACT_APP_TOKEN;
  console.log("Token:", token); // Debugging line to print token value to the console
  console.log("uri:", apiUrl); // Debugging line to print API URL to the console
  return {
    headers: {
      authorization: token ? token : "",
    },
  };
});

// Create the Apollo client with the authentication link and HTTP link
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// Render the app inside a React root element
const container = document.getElementById("root");
const rootElement = createRoot(container);
rootElement.render(
  <React.StrictMode>
    {/* Wrap the app in the ApolloProvider to inject the client instance */}
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
