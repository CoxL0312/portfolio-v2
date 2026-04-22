import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import React from "react";
import { ThemeProvider } from "./ThemeContext.tsx"

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <App/>
    </ThemeProvider>
  </React.StrictMode>
)
