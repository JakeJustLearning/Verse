import * as THREE from 'three'
import { ARButton } from './components/ARButton'
// import { renderer } from './components/renderer'
// import { loadGLTF } from './components/loader'
// import { getTargetRayPose, requestTargetRayInfo } from './helpers/targetRaySpace'
import { initHitTestSource, requestHitTestPoseMatrix, updateObjectMatrixFromHit } from './helpers/hitTest'
import { initARApp } from './helpers/initARApp'
import reticle from './components/reticle'
import animate from './helpers/animate'

const container = document.createElement('div');
document.body.appendChild(container)

const arApp = initARApp()

arApp.scene.add(reticle)
let targetRayPose

const selectRay = new THREE.Raycaster()

function checkIntersections(origin, direction) {
  console.log('looking for intersection')
  selectRay.set(origin, direction)
  console.log(arApp.scene.children)
  const intersects = selectRay.intersectObjects(arApp.scene.children)
  console.log(intersects)
  const arrowHelper = new THREE.ArrowHelper(direction, origin, 1, 0xffff00)
  if (intersects[0]) {
    console.log('intersections found', intersects)
    intersects[0].object.material.color.set(0xffffff * Math.random())
  }
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
function onSelectController(event) {
  const touchOrigin = new THREE.Vector3()
  touchOrigin.set(0, 0, 0).applyMatrix4(arApp.controller.matrixWorld)
  const touchDirection = new THREE.Vector3()
  touchDirection.set(0, 0, -1).applyMatrix4(arApp.controller.matrixWorld)
  console.log({ touchOrigin, touchDirection })
  checkIntersections(touchOrigin, touchDirection)

}

function renderARApp(timestamp, frame) {
  if (frame && arApp.session) {
    const hitPoseMatrix = requestHitTestPoseMatrix(timestamp, frame, arApp.session, arApp.renderer)
    if (hitPoseMatrix) {
      updateObjectMatrixFromHit(reticle, hitPoseMatrix)
      reticle.visible = true
    } else {
      reticle.visible = false
    }
  }
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


