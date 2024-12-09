import React from 'react';
import { Info, Camera, Sun, PlayCircle } from 'lucide-react';

export function Instructions() {
  const steps = [
    {
      icon: Camera,
      text: 'Izinkan akses kamera saat diminta'
    },
    {
      icon: Sun,
      text: 'Pastikan pencahayaan cukup terang'
    },
    {
      icon: PlayCircle,
      text: 'Ikuti instruksi gerakan yang akan muncul'
    }
  ];

  return (
    <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <Info className="w-5 h-5 text-blue-400" />
        <h2 className="font-semibold text-gray-100">Petunjuk Penggunaan</h2>
      </div>
      <div className="space-y-3">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center gap-3 text-gray-300">
            <div className="w-8 h-8 rounded-lg bg-gray-700/50 flex items-center justify-center">
              <step.icon className="w-5 h-5" />
            </div>
            <p className="text-sm">{step.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}