// index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// ErrorBoundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

// Root Element
const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('Root element not found in DOM');
  throw new Error('Root element missing: Unable to initialize application.');
}

const root = createRoot(rootElement);

// Render Application
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);