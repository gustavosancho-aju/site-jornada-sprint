import React from 'react';
import ReactDOM from 'react-dom/client';
// CSS moved to App.tsx so it loads AFTER hero paint (non-render-blocking)

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);

// Start downloading App chunk immediately (in parallel with hero.webp)
// but DON'T execute React render yet — let the browser paint the hero first.
const appPromise = import('./App');

// Paint break: two rAF frames guarantee the browser has rendered
// the permanent HTML hero. Only THEN mount the React app.
// This makes the hero.webp paint (~2-3s) the final LCP
// instead of waiting for React hydration (7+ s).
requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    appPromise.then(({ default: App }) => {
      root.render(
        <React.StrictMode>
          <App />
        </React.StrictMode>
      );
    });
  });
});
