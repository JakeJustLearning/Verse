export function getTargetRayPose(frame, session, targetRaySpace) {
  return (
    frame.getPose(targetRaySpace, frame.session.requestReferenceSpace('viewer'))
  )
}

export function getTargetRayOrigin(targetRayPose) {
  return targetRayPose.transform.position
}
export function getTargetRayDirection(targetRayPose) {
  return targetRayPose.transform.orientation
}

export function requestTargetRayInfo(frame, session, targetRaySpace) {
  const rayPose = getTargetRayPose(frame, session, targetRaySpace)
  return { rayOrigin: getTargetRayOrigin(rayPose), rayDirection: getTargetRayDirection(rayPose) }
}