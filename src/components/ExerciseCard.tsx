import React from 'react';
import { Exercise } from '../types/exercise';
import { ChevronRight, Dumbbell } from 'lucide-react';

interface ExerciseCardProps {
  exercise: Exercise;
  onSelect: (exercise: Exercise) => void;
}

export function ExerciseCard({ exercise, onSelect }: ExerciseCardProps) {
  return (
    <button
      onClick={() => onSelect(exercise)}
      className="w-full bg-gray-800 rounded-xl overflow-hidden transition-transform hover:scale-[1.02] active:scale-[0.98]"
    >
      <div className="aspect-video relative">
        <img
          src={exercise.imageUrl}
          alt={exercise.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-0 p-4">
          <h3 className="text-lg font-semibold text-white">{exercise.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <Dumbbell className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-gray-300 capitalize">
              {exercise.difficulty}
            </span>
          </div>
        </div>
      </div>
      <div className="p-4 flex items-center justify-between">
        <p className="text-sm text-gray-400 line-clamp-2">{exercise.description}</p>
        <ChevronRight className="w-5 h-5 text-gray-500 flex-shrink-0" />
      </div>
    </button>
  );
}