import { Exercise } from '../types/exercise';

export const exercises: Exercise[] = [
  {
    id: 'shoulder-press',
    name: 'Shoulder Press',
    description: 'Latihan untuk memperkuat otot bahu dan lengan atas',
    difficulty: 'beginner',
    targetMuscles: ['Deltoid', 'Triceps', 'Upper Trapezius'],
    imageUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80&w=500',
    instructions: [
      'Berdiri dengan posisi tegak',
      'Angkat kedua lengan hingga sejajar bahu',
      'Dorong ke atas hingga lengan lurus',
      'Turunkan perlahan ke posisi awal'
    ]
  },
  {
    id: 'squat',
    name: 'Basic Squat',
    description: 'Gerakan dasar untuk memperkuat otot kaki dan core',
    difficulty: 'beginner',
    targetMuscles: ['Quadriceps', 'Hamstrings', 'Glutes'],
    imageUrl: 'https://images.unsplash.com/photo-1566241142559-40e1dab266c6?auto=format&fit=crop&q=80&w=500',
    instructions: [
      'Berdiri dengan kaki selebar bahu',
      'Turunkan pinggul seperti duduk',
      'Jaga punggung tetap lurus',
      'Kembali ke posisi berdiri'
    ]
  }
];