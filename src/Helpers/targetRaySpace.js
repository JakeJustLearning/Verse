// help get target ray space information to be used for three.js rayscanner and intersection detection
// Must be placed on an XRSession event inorder to get the necessary information!

export function getTargetRayPose(frame, session, targetRaySpace) {
  // const viewerRefSpace = session ?
  // // session.requestReferenceSpace('viewer') :
  // const viewerRefSpace =  frame.session.requestReferenceSpace('viewer')
  // return viewerRefSpace
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