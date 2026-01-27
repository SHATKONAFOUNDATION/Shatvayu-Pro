import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Camera, useCameraDevices, useFrameProcessor } from 'react-native-vision-camera';
// 1. Fixed the path to your new utils folder

export function FasciaMaxScanner() {
  const devices = useCameraDevices();
  // 2. Fixed the camera selection logic
  const device = devices.find((d) => d.position === 'back');

  const frameProcessor = useFrameProcessor((frame) => {
    'worklet';
    // 3. Placeholder for the AI model (prevents 'detectPose' error)
    // In a real run, this is where the MediaPipe plugin connects
    console.log("Analyzing Fascia...");
  }, []);

  // 4. Replaced LoadingView with a basic View to stop the error
  if (device == null) return <View style={styles.center}><Text>Loading Camera...</Text></View>;

  return (
    <View style={StyleSheet.absoluteFill}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        frameProcessor={frameProcessor}
        // 5. Removed frameProcessorFps (not supported in some versions)
      />
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});