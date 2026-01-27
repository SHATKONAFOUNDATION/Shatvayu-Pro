// Landmark IDs: 7 = Left Ear, 8 = Right Ear, 11 = Left Shoulder, 12 = Right Shoulder
export const checkPosture = (landmarks) => {
  'worklet';
  const leftEar = landmarks[7];
  const leftShoulder = landmarks[11];

  // The "Forward Head" Calculation (x-axis deviation)
  // In AI coordinates, a difference of > 0.05 is significant tension
  const deviation = Math.abs(leftEar.x - leftShoulder.x);

  if (deviation > 0.08) {
    return { status: "POOR", label: "Severe Fascial Pull", color: "red" };
  } else if (deviation > 0.04) {
    return { status: "WARNING", label: "Mild Tension", color: "yellow" };
  }
  return { status: "GOOD", label: "Aligned", color: "green" };
};