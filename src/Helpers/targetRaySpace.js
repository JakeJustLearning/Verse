// help get target ray space information to be used for three.js rayscanner and intersection detection


export function getTargetRaySpace(event) {
  return event.data[Object.getOwnPropertySymbols(event.data)[0]].targetRaySpaces
}

export function getTargetRayPose(frame, targetRaySpaces) {
  const viewerRefSpace = frame.session.requestReferenceSpace('viewer')
  return frame.session.getPose(targetRaySpaces, viewerRefSpace)
}

export function getTargetRayOrigin(targetRayPose) {
  return targetRayPose.transform.position
}
export function getTargetRayDirection(targetRayPose) {
  return targetRayPose.transform.orientation
}

export function requestTargetRayInfo(event, frame) {
  const rayPose = getTargetRayPose(frame, getTargetRaySpace(event))
  return { rayOrigin: getTargetRayOrigin(rayPose), rayDirection: getTargetRayDirection(rayPose) }
}