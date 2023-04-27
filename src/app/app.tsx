import * as React from 'react';
import { createRoot } from 'react-dom/client';

const Index = () => {
  return <div>Hello WEG!</div>;
};

const root = createRoot(document.getElementById('app'));
root.render(<Index />);
