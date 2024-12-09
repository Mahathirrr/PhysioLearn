import React, { useEffect, useState } from 'react';
import { Exercise } from '../types/exercise';
import { PoseKeypoint, PoseAnalysis, ExerciseStage } from '../types/pose';
import { calculateAngle, getJointPosition, isAngleWithinRange, getConfidenceScore } from '../utils/poseAnalysis';
import { exerciseStages } from '../data/exerciseStages';
import { CheckCircle2, AlertCircle, Activity } from 'lucide-react';

interface PoseAnalyzerProps {
  exercise: Exercise;
  keypoints: PoseKeypoint[];
}

export function PoseAnalyzer({ exercise, keypoints }: PoseAnalyzerProps) {
  const [currentStage, setCurrentStage] = useState<number>(0);
  const [analysis, setAnalysis] = useState<PoseAnalysis | null>(null);
  const [repCount, setRepCount] = useState(0);
  const stages = exerciseStages[exercise.id];

  useEffect(() => {
    if (keypoints.length === 0) return;

    const stage = stages[currentStage];
    const confidence = getConfidenceScore(keypoints);
    
    if (confidence < 0.5) {
      setAnalysis({
        isCorrect: false,
        feedback: 'Pastikan seluruh tubuh terlihat di kamera',
        confidence,
        angles: []
      });
      return;
    }

    const angles: PoseAnalysis['angles'] = [];
    let allAnglesCorrect = true;

    for (const [name, target] of Object.entries(stage.targetAngles)) {
      const [joint1, joint2, joint3] = target.joints;
      const point1 = getJointPosition(keypoints, joint1);
      const point2 = getJointPosition(keypoints, joint2);
      const point3 = getJointPosition(keypoints, joint3);

      if (!point1 || !point2 || !point3) {
        allAnglesCorrect = false;
        continue;
      }

      const angle = calculateAngle(point1, point2, point3);
      angles.push({ angle, joints: target.joints });

      if (!isAngleWithinRange(angle, target.min, target.max)) {
        allAnglesCorrect = false;
      }
    }

    setAnalysis({
      isCorrect: allAnglesCorrect,
      feedback: allAnglesCorrect ? stage.feedback.success : stage.feedback.error,
      confidence,
      angles
    });

    if (allAnglesCorrect) {
      if (currentStage === stages.length - 1) {
        setTimeout(() => {
          setCurrentStage(0);
          setRepCount(prev => prev + 1);
        }, 1000);
      } else {
        setTimeout(() => {
          setCurrentStage(prev => prev + 1);
        }, 1000);
      }
    }
  }, [keypoints, currentStage, exercise.id, stages]);

  if (!analysis) return null;

  return (
    <div className="absolute bottom-0 inset-x-0 p-4 space-y-2">
      <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {analysis.isCorrect ? (
              <CheckCircle2 className="w-5 h-5 text-green-400" />
            ) : (
              <AlertCircle className="w-5 h-5 text-yellow-400" />
            )}
            <p className="text-sm font-medium text-white">{analysis.feedback}</p>
          </div>
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-blue-400">
              {Math.round(analysis.confidence * 100)}%
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="px-3 py-1 bg-gray-800 rounded-full">
              <p className="text-sm font-semibold text-gray-300">
                Stage: {currentStage + 1}/{stages.length}
              </p>
            </div>
          </div>
          <div className="px-3 py-1 bg-blue-500/20 rounded-full">
            <p className="text-sm font-semibold text-blue-300">
              Rep: {repCount}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}