import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/global.css';
import App from './App.jsx';
import { reportWebVitals } from './lib/vitals';
import { installErrorMonitoring } from './lib/monitoring';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// Started here rather than inside a component: these are page-lifetime
// measurements, and StrictMode double-mounts a component in development, which
// would register two sets of observers and report everything twice.
installErrorMonitoring();
reportWebVitals();
