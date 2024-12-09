import React from 'react';
import { Activity, Menu } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <nav className="fixed top-0 w-full bg-gray-800/80 backdrop-blur-lg border-b border-gray-700 z-50">
        <div className="max-w-md mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-6 h-6 text-blue-400" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              PhysioLearn
            </h1>
          </div>
          <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>
      <main className="pt-16 min-h-screen">
        {children}
      </main>
    </div>
  );
}