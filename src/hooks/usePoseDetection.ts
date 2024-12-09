import { useEffect, useRef, useState } from 'react';
import * as poseDetection from '@tensorflow-models/pose-detection';
import '@tensorflow/tfjs-backend-webgl';
import { PoseKeypoint } from '../types/exercise';

export function usePoseDetection(videoRef: React.RefObject<HTMLVideoElement>) {
  const [keypoints, setKeypoints] = useState<PoseKeypoint[]>([]);
  const detectorRef = useRef<poseDetection.PoseDetector | null>(null);

  useEffect(() => {
    async function initPoseDetection() {
      const detector = await poseDetection.createDetector(
        poseDetection.SupportedModels.BlazePose,
        {
          runtime: 'tfjs',
          modelType: 'lite'
        }
      );
      detectorRef.current = detector;
    }

    initPoseDetection();

    return () => {
      if (detectorRef.current) {
        detectorRef.current.dispose();
      }
    };
  }, []);

  useEffect(() => {
    if (!videoRef.current || !detectorRef.current) return;

    let animationFrame: number;

    async function detectPose() {
      if (!videoRef.current || !detectorRef.current) return;

      try {
        const poses = await detectorRef.current.estimatePoses(videoRef.current);
        if (poses.length > 0) {
          const mappedKeypoints = poses[0].keypoints.map(kp => ({
            x: kp.x,
            y: kp.y,
            z: kp.z || 0,
            score: kp.score,
            name: kp.name || ''
          }));
          setKeypoints(mappedKeypoints);
        }
      } catch (error) {
        console.error('Error detecting pose:', error);
      }

      animationFrame = requestAnimationFrame(detectPose);
    }

    detectPose();

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [videoRef]);

  return keypoints;
}