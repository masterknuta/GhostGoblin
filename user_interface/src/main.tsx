import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

// Find the root element in the HTML.
const rootElement = document.getElementById('root');

if (rootElement) {
  // Create a React root and render the App component.
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
} else {
  // Log an error if the root element isn't found.
  console.error("Root element with ID 'root' not found in the document.");
}
