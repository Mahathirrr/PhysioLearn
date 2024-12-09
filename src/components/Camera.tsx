import React, { useRef, useEffect, useState } from 'react';
import { AlertCircle, Camera as CameraIcon } from 'lucide-react';
import { Exercise } from '../types/exercise';
import { usePoseDetection } from '../hooks/usePoseDetection';
import { PoseAnalyzer } from './PoseAnalyzer';
import { PoseVisualization } from './PoseVisualization';

interface CameraProps {
  exercise?: Exercise;
}

export function Camera({ exercise }: CameraProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const keypoints = usePoseDetection(videoRef);

  useEffect(() => {
    async function setupCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user' }
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setIsLoading(false);

          // Set dimensions once video metadata is loaded
          videoRef.current.onloadedmetadata = () => {
            if (videoRef.current) {
              setDimensions({
                width: videoRef.current.videoWidth,
                height: videoRef.current.videoHeight
              });
            }
          };
        }
      } catch (err) {
        setError('Tidak dapat mengakses kamera. Pastikan kamera diizinkan.');
        setIsLoading(false);
        console.error('Camera error:', err);
      }
    }

    setupCamera();

    return () => {
      const stream = videoRef.current?.srcObject as MediaStream;
      stream?.getTracks().forEach(track => track.stop());
    };
  }, []);

  return (
    <div className="relative w-full aspect-[9/16] max-w-md mx-auto bg-gray-800 rounded-2xl overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
          <CameraIcon className="w-8 h-8 text-gray-400 animate-pulse" />
        </div>
      )}
      
      {error ? (
        <div className="absolute inset-0 p-4 flex items-center justify-center">
          <div className="bg-red-900/50 p-4 rounded-lg flex items-center gap-2 text-red-200 backdrop-blur-sm">
            <AlertCircle className="w-5 h-5" />
            <p>{error}</p>
          </div>
        </div>
      ) : (
        <>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />
          {dimensions.width > 0 && keypoints.length > 0 && (
            <PoseVisualization
              keypoints={keypoints}
              videoWidth={dimensions.width}
              videoHeight={dimensions.height}
            />
          )}
          {exercise && keypoints.length > 0 && (
            <PoseAnalyzer exercise={exercise} keypoints={keypoints} />
          )}
        </>
      )}
      
      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        <p className="text-sm text-gray-300 text-center">
          Posisikan diri Anda agar terlihat seluruh tubuh
        </p>
      </div>
    </div>
  );
}