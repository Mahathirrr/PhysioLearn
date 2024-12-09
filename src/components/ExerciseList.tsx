import React from 'react';
import { Exercise } from '../types/exercise';
import { ExerciseCard } from './ExerciseCard';
import { exercises } from '../data/exercises';

interface ExerciseListProps {
  onSelectExercise: (exercise: Exercise) => void;
}

export function ExerciseList({ onSelectExercise }: ExerciseListProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-100">Pilih Latihan</h2>
      <div className="grid gap-4">
        {exercises.map((exercise) => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            onSelect={onSelectExercise}
          />
        ))}
      </div>
    </div>
  );
}