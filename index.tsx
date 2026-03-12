import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Hide the fixed-position hero skeleton once React has painted
requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    const skeleton = document.getElementById('hero-skeleton');
    if (skeleton) {
      skeleton.style.transition = 'opacity 0.3s ease-out';
      skeleton.style.opacity = '0';
      skeleton.addEventListener('transitionend', () => {
        skeleton.style.display = 'none';
      }, { once: true });
    }
  });
});