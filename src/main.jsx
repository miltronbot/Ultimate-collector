import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { CollectionProvider } from './context/CollectionContext.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <CollectionProvider>
        <App />
      </CollectionProvider>
    </ThemeProvider>
  </StrictMode>,
);
