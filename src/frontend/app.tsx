import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Router } from './src/router/router';
import './style.css';
import './assets/forms.css';
import './assets/text.css';
import { routes } from './routes';
import { MainUI } from './src/ui/main-ui';
import { initInventoryTracker } from './init';
import { LocalStorage } from '../web-local-storage/storage';

initInventoryTracker({
  storage: LocalStorage,
});

const root = createRoot(document.getElementById('app'));
root.render(<Router routes={routes} layout={MainUI} />);
