import * as THREE from 'three'

let hitTestSource = null
let hitTestSourceRequested = false


const runHitTest = (renderer, timestamp, frame, reticle) => {
  if (frame) {
    const referenceSpace = renderer.xr.getReferenceSpace()
    const session = renderer.xr.getSession()

    if (hitTestSourceRequested === false) {
      session.requestReferenceSpace('viewer')
        .then(referenceSpace => {
          session.requestHitTestSource({ space: referenceSpace })
            .then(source => {
              hitTestSource = source
            })
        })
      session.addEventListener('end', function () {
        hitTestSourceRequested = false
        hitTestSource = null
      })
      hitTestSourceRequested = true
    }
    if (hitTestSource) {
      const hitTestResults = frame.getHitTestResults(hitTestSource);
      if (hitTestResults.length) {
        const hit = hitTestResults[0]

        reticle.visible = true
        reticle.matrix.fromArray(hit.getPose(referenceSpace).transform.matrix)
      } else {
        reticle.visbile = false
      }
    }
  }
}