import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Ensure that `root` element exists and is of correct type
const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('Root element not found');
  throw new Error('Root element not found');
}

const root = createRoot(rootElement);

// Wrap the rendering in StrictMode for better dev experience
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);