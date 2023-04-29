import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Router } from './src/router/router';
import './style.css';
import { routes } from './routes';

const root = createRoot(document.getElementById('app'));
root.render(<Router routes={routes} />);
