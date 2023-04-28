import * as React from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

const Index = () => {
  return <div>Hello WEG!</div>;
};

const root = createRoot(document.getElementById('app'));
root.render(<Index />);
