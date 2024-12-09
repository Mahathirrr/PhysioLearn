import { ExerciseStage } from '../types/pose';

export const exerciseStages: Record<string, ExerciseStage[]> = {
  'shoulder-press': [
    {
      name: 'start',
      targetAngles: {
        leftShoulder: {
          min: 85,
          max: 95,
          joints: ['left_elbow', 'left_shoulder', 'left_hip']
        },
        rightShoulder: {
          min: 85,
          max: 95,
          joints: ['right_elbow', 'right_shoulder', 'right_hip']
        }
      },
      feedback: {
        success: 'Posisi awal bagus! Angkat lengan sejajar bahu',
        error: 'Sejajarkan lengan dengan bahu Anda'
      }
    },
    {
      name: 'press',
      targetAngles: {
        leftArm: {
          min: 165,
          max: 180,
          joints: ['left_wrist', 'left_elbow', 'left_shoulder']
        },
        rightArm: {
          min: 165,
          max: 180,
          joints: ['right_wrist', 'right_elbow', 'right_shoulder']
        }
      },
      feedback: {
        success: 'Sempurna! Tahan posisi ini',
        error: 'Luruskan lengan Anda ke atas'
      }
    }
  ],
  'squat': [
    {
      name: 'start',
      targetAngles: {
        knees: {
          min: 165,
          max: 180,
          joints: ['left_hip', 'left_knee', 'left_ankle']
        },
        hips: {
          min: 165,
          max: 180,
          joints: ['left_shoulder', 'left_hip', 'left_knee']
        }
      },
      feedback: {
        success: 'Posisi awal bagus! Siap untuk squat',
        error: 'Luruskan kaki dan punggung Anda'
      }
    },
    {
      name: 'squat',
      targetAngles: {
        knees: {
          min: 85,
          max: 95,
          joints: ['left_hip', 'left_knee', 'left_ankle']
        },
        hips: {
          min: 85,
          max: 95,
          joints: ['left_shoulder', 'left_hip', 'left_knee']
        }
      },
      feedback: {
        success: 'Squat yang bagus! Tahan posisi ini',
        error: 'Turunkan pinggul lebih dalam, jaga punggung tetap lurus'
      }
    }
  ]
};