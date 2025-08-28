import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import 'highlight.js/styles/github.css';
import { Buffer } from 'buffer';

// Polyfill Buffer for gray-matter
window.Buffer = Buffer;

import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
