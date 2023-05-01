import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Router } from './src/router/router';
import './style.css';
import { routes } from './routes';
import { MainUI } from './src/ui/main-ui';

const root = createRoot(document.getElementById('app'));
root.render(<Router routes={routes} layout={MainUI} />);
