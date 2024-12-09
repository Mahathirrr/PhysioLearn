import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Camera } from './components/Camera';
import { Instructions } from './components/Instructions';
import { ExerciseList } from './components/ExerciseList';
import { Exercise } from './types/exercise';

function App() {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  return (
    <Layout>
      <div className="p-4 max-w-md mx-auto space-y-6">
        {!selectedExercise ? (
          <>
            <Instructions />
            <ExerciseList onSelectExercise={setSelectedExercise} />
          </>
        ) : (
          <>
            <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-xl p-4">
              <h2 className="text-xl font-semibold text-gray-100 mb-2">{selectedExercise.name}</h2>
              <p className="text-gray-300 text-sm mb-4">{selectedExercise.description}</p>
              <ol className="list-decimal list-inside space-y-2">
                {selectedExercise.instructions.map((instruction, index) => (
                  <li key={index} className="text-gray-400 text-sm">{instruction}</li>
                ))}
              </ol>
            </div>
            <Camera exercise={selectedExercise} />
            <button
              onClick={() => setSelectedExercise(null)}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Pilih Latihan Lain
            </button>
          </>
        )}
        
        <div className="mt-4 text-center text-sm text-gray-500">
          <p>PhysioLearn v1.0 - Pembelajaran Anatomi & Olahraga</p>
        </div>
      </div>
    </Layout>
  );
}

export default App;