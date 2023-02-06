import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "antd/dist/reset.css";
import "./index.scss";

const domNode = document.getElementById("root");
const root = createRoot(domNode);
root.render(
  // <React.StrictMode>
  <App />
  // {/* </React.StrictMode>, */}
  // document.getElementById("root")
);
