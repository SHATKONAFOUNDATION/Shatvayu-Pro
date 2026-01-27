import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Camera, useCameraDevices, useFrameProcessor } from 'react-native-vision-camera';
import { detectPose } from 'vision-camera-pose-detector'; // The AI Engine
import { checkPosture } from '../utils/postureLogic'; // Your Clinical Logic

export function FasciaMaxScanner() {
  const devices = useCameraDevices();
  const device = devices.find((d) => d.position === 'back');

  const frameProcessor = useFrameProcessor((frame) => {
    'worklet';
    
    // 1. Run the AI Pose Detection
    const pose = detectPose(frame); 

    if (pose) {
      // 2. Using 'as any' to bypass strict typing and get the data moving
      // This feeds the detected landmarks directly into your Shatkona Logic
      const result = checkPosture(pose as any); 
      
      // 3. Log the real-time biomechanical status for the demo
      console.log(`[FASCIAMAX AI] Result: ${result.label} | Color: ${result.color}`); 
    }
  }, []);

  if (device == null) {
    return (
      <View style={styles.center}>
        <Text style={{color: 'white'}}>Initializing Shatvayu AI Camera...</Text>
      </View>
    );
  }

  return (
    <View style={StyleSheet.absoluteFill}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        frameProcessor={frameProcessor}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  center: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#000' 
  }
});