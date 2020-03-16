import React from "react";
import ReactDOM from "react-dom";
import { RelayEnvironmentProvider } from "relay-hooks";

import App from "./App";
import env from "./relay/environment";

ReactDOM.render(
  <RelayEnvironmentProvider environment={env}>
    <App />
  </RelayEnvironmentProvider>,
  document.getElementById("root")
);
