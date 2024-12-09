export interface Exercise {
  id: string;
  name: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  targetMuscles: string[];
  imageUrl: string;
  instructions: string[];
}

export interface PoseKeypoint {
  x: number;
  y: number;
  z: number;
  score?: number;
  name: string;
}