// help get target ray space information to be used for three.js rayscanner and intersection detection


export const getTargetRaySpace = (event) => {
  return event.data[Object.getOwnPropertySymbols(event.data)[0]].targetRaySpaces
}

export const getTargetRayPose = (frame, targetRaySpaces) => {
  const viewerRefSpace = frame.session.requestReferenceSpace('viewer')
  return frame.session.getPose(targetRaySpaces, viewerRefSpace)
}

export const getTargetRayOrigin = (targetRayPose) => targetRayPose.transform.position
export const getTargetRayDirection = (targetRayPose) => targetRayPose.transform.orientation

export const requestTargetRayInfo = (event, frame) => {
  const rayPose = getTargetRayPose(frame, getTargetRaySpace(event))
  return { rayOrigin: getTargetRayOrigin(rayPose), rayDirection: getTargetRayDirection(rayPose) }
}