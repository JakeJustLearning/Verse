export function initHitTestSource(session) {
  if (!session.hitTestSourceRequested) {
    session.requestReferenceSpace('viewer')
      .then(referenceSpace => {
        session.requestHitTestSource({ space: referenceSpace })
          .then(source => {
            session.addEventListener('end', function () {
              session.hitTestSourceRequested = false
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

export function requestHitTestPoseMatrix(time, frame, session, renderer) {
  if (session.hitTestSource) {
    const hitTestResults = getHitTestResults(time, frame, session)
    if (hitTestResults.length) {
      return hitTestResults[0].getPose(renderer.xr.getReferenceSpace()).transform.matrix
    }
  }
}

export function updateObjectMatrixFromHit(object, hitMatrix) {
  object.matrix.fromArray(hitMatrix)
}
