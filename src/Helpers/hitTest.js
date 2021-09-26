export function initHitTestSource(session) {
  if (!session.hitTestSourceReqeusted) {
    session.requestReferenceSpace('viewer')
      .then(referenceSpace => {
        session.requestHitTestSource({ space: referenceSpace })
          .then(source => {
            session.addEventListener('end', function () {
              session.hitTestSourceReqeusted = false
              session.hittestSource = null
            })
            session.hitTestSource = source
          })
      })
  }
}

export function getHitTestResults(time, frame, session) {
  if (session.hitTestSource) return frame.getHitTestResults(session.hitTestSource)
}

//returns the hitTestResultPose's transform Matrix as an Array for use in setting position of other objects`
export function requestHitTestPoseMatrix(time, frame, session, renderer) {
  if (session.hitTestSource) {
    const hitTestResults = getHitTestResults(time, frame, session)
    if (hitTestResults.length) {
      return hitTestResults[0].getPose(renderer.xr.getReferenceSpace()).transform.matrix
    }
  }
}
