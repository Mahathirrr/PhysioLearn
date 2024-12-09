export interface PoseAngle {
  angle: number;
  joints: [string, string, string];
}

export interface PoseAnalysis {
  isCorrect: boolean;
  feedback: string;
  confidence: number;
  angles: PoseAngle[];
}

export interface ExerciseStage {
  name: string;
  targetAngles: {
    [key: string]: {
      min: number;
      max: number;
      joints: [string, string, string];
    };
  };
  feedback: {
    success: string;
    error: string;
  };
}