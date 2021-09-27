import * as THREE from 'three'
import { ARButton } from './components/ARButton'
// import { renderer } from './components/renderer'
// import { loadGLTF } from './components/loader'
import { getTargetRayPose, requestTargetRayInfo } from './helpers/targetRaySpace'
import { initHitTestSource, requestHitTestPoseMatrix, updateObjectMatrixFromHit } from './helpers/hitTest'
import { initARApp } from './helpers/initARApp'
import reticle from './components/reticle'
import animate from './helpers/animate'

const container = document.createElement('div');
document.body.appendChild(container)

const arApp = initARApp()

arApp.scene.add(reticle)
// let targetRayPose

const selectRay = new THREE.Raycaster()

function checkIntersections(origin, direction) {
  // console.log('looking for intersection')
  selectRay.set(origin, direction)
  const intersects = selectRay.intersectObjects(arApp.scene.children)
  const arrowHelper = new THREE.ArrowHelper(direction, origin, 1, 0xffff00)
  if (intersects[0]) intersects[0].object.rotateX(25)
  arApp.scene.add(arrowHelper)
}




// const wolf = await loadGLTF('./assets/wolf_gltf/Wolf-Blender-2.82a.gltf')
// wolf.visible = false
// scene.add(wolf)




// function handleSessionOnSelect(event) {
//   console.log('onselect event happening')
//   let source = event.inputSource
//   if (arApp.session.hitTestSource) {

//   }
//   arApp.session.requestReferenceSpace('viewer')
//     .then(viewerRefSpace => {
//       if (viewerRefSpace) {
//         const targetRayPose = event.frame.getPose(source.targetRaySpace, viewerRefSpace)
//         console.log(targetRayPose)
//       }
//     })
//   // console.log('on session event', event)
//   // console.log(event.frame)
//   // console.log(arApp.session)
//   // console.log(event.inputSource.targetRaySpace)
//   // console.log(getTargetRayPose(event.frame, arApp.session, event.inputSource.targetRaySpace))
// }
// CREATE EVENT LISTENER FOR WEBXR SELECT EVENTs

// function onSelect() {
//   if (reticle.visible) {
//     wolf.position.setFromMatrixPosition(reticle.matrix)
//     wolf.visible = true
//   }
// }
async function onSelectController(event) {
  console.log(event)
  console.log(arApp.controller)
  // let axis = event.inputSource.gamepad.axes
  console.log('on controller event', event)
  const touchOrigin = new THREE.Vector3()
  touchOrigin.set(0, 0, 0).applyMatrix4(arApp.controller.matrixWorld)
  const touchDirection = new THREE.Vector3()
  touchDirection.set(0, 0, -1).applyMatrix4(arApp.controller.matrixWorld)
  console.log({ touchOrigin, touchDirection })
  checkIntersections(touchOrigin, touchDirection)

}

function renderARApp(timestamp, frame) {
  if (frame && arApp.session) {
    // handle onSelect in renderFrame
    // if (arApp.source.onSelect) {
    //   let event = arApp.source.onSelect
    //   // let frame = event.frame
    //   let targetRaySpace = event.inputSource.targetRaySpace
    //   let targetRayPose
    //   arApp.session.requestReferenceSpace('viewer')
    //     .then(refSpace => {
    //       console.log({ targetRaySpace, refSpace, frame })
    //       targetRayPose = frame.getPose(targetRaySpace, refSpace)
    //       console.log(targetRayPose)
    //       // console.log(targetPose)
    //     })
    // }


    const hitPoseMatrix = requestHitTestPoseMatrix(timestamp, frame, arApp.session, arApp.renderer)
    if (hitPoseMatrix) {
      updateObjectMatrixFromHit(reticle, hitPoseMatrix)
      reticle.visible = true
    } else {
      reticle.visible = false
    }
  }
  // arApp.source.onSelect = null
  arApp.renderer.render(arApp.scene, arApp.camera)
}

document.body.appendChild(ARButton.createButton(arApp.renderer, {
  domOverlay: {
    root: document.body
  },
  onStartCallback: async (session) => {
    arApp.session = session
    await initHitTestSource(arApp.session)
    container.appendChild(arApp.renderer.domElement)
    arApp.controller = arApp.renderer.xr.getController(0)
    arApp.controller.addEventListener('select', (e) => {
      onSelectController(e)
    })
  },
}))

animate(arApp, renderARApp)


