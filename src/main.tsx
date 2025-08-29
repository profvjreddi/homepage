import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import 'highlight.js/styles/github.css';
import { Buffer } from 'buffer';

// Polyfill Buffer for gray-matter
window.Buffer = Buffer;

// Handle redirects from 404.html for SPA routing
if (sessionStorage.redirect) {
  const redirect = sessionStorage.redirect;
  delete sessionStorage.redirect;
  history.replaceState(null, '', redirect);
}

import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
