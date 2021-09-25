import * as THREE from 'three'

// let hitTestSource = null
// let hitTestSourceRequested = false


export const initHitTestSource = (session) => {
  if (!session.hitTestSourceReqeusted) {
    session.requestReferenceSpace('viewer')
      .then( referenceSpace=> {
        session.requestHitTestSource({space:referenceSpace})
        .then(source => {
          session.addEventListener('end', function () {
            session.hitTestSourceReqeusted = false
            session.hittestSource = null
          })
          session.hitTestSource =  source
        } )
    })
  }
}

export const getHitTestResults = (time,frame,session) => {
  if (session.hitTestSource) return frame.getHitTestResults(session.hitTestSource)
}

//returns the hitTestResultPose Matrix for use in setting position of other objects
export const requestHitTestPoseMatrix = (time,frame,session,renderer) => {
  if(session.hitTestSource) {
    const hitTestResults = getHitTestResults(time,frame,session)
    if (hitTestResults.length) {
      return hitTestResults[0].getPose(renderer.xr.getReferenceSpace()).transform.matrix
    }
    // return getHitTestResults(time,frame,session)
      // .then(hitTestResults => { 
      //   return hitTestResults[0].getPose(session.referenceSpace)
      // })
  }
}




// const requestHitTest = (renderer,session, frame, reticle) => {
//   if (frame) {
//     const referenceSpace = renderer.xr.getReferenceSpace()

//     if (hitTestSourceRequested === false) {
//       session.requestReferenceSpace('viewer')
//         .then(referenceSpace => {
//           session.requestHitTestSource({ space: referenceSpace })
//             .then(source => {
//               hitTestSource = source
//             })
//         })
//       session.addEventListener('end', function () {
//         hitTestSourceRequested = false
//         hitTestSource = null
//       })
//       hitTestSourceRequested = true
//     }
//     if (hitTestSource) {
//       const hitTestResults = frame.getHitTestResults(hitTestSource);
//       if (hitTestResults.length) {
//         const hit = hitTestResults[0]

//         reticle.visible = true
//         reticle.matrix.fromArray(hit.getPose(referenceSpace).transform.matrix)
//       } else {
//         reticle.visbile = false
//       }
//     }
//   }
// }