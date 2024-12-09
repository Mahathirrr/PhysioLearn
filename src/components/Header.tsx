import React from 'react';
import { Activity } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 shadow-md">
      <div className="max-w-md mx-auto flex items-center gap-2">
        <Activity className="w-6 h-6" />
        <h1 className="text-xl font-bold">PhysioLearn</h1>
      </div>
    </header>
  );
}