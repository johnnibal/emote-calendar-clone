
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { CalendarShell } from './components/CalendarShell';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className="min-h-screen bg-gray-100 p-2 sm:p-4 md:p-6 lg:p-8">
      <div className="max-w-[1440px] mx-auto">
        <CalendarShell />
      </div>
    </div>
  </React.StrictMode>
);
