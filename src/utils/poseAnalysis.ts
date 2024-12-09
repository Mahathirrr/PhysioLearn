import { PoseKeypoint, PoseAngle } from '../types/pose';

export function calculateAngle(
  pointA: PoseKeypoint,
  pointB: PoseKeypoint,
  pointC: PoseKeypoint
): number {
  const radians = Math.atan2(
    pointC.y - pointB.y,
    pointC.x - pointB.x
  ) - Math.atan2(
    pointA.y - pointB.y,
    pointA.x - pointB.x
  );
  
  let angle = Math.abs((radians * 180.0) / Math.PI);
  if (angle > 180.0) {
    angle = 360 - angle;
  }
  return angle;
}

export function getJointPosition(keypoints: PoseKeypoint[], jointName: string): PoseKeypoint | null {
  return keypoints.find(kp => kp.name === jointName) || null;
}

export function isAngleWithinRange(angle: number, min: number, max: number): boolean {
  return angle >= min && angle <= max;
}

export function getConfidenceScore(keypoints: PoseKeypoint[]): number {
  const scores = keypoints.map(kp => kp.score || 0);
  return scores.reduce((acc, score) => acc + score, 0) / scores.length;
}