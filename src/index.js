import * as THREE from 'three'
import { ARButton } from './components/ARButton'
import { renderer } from './components/renderer'
import { loadGLTF } from './components/loader'
import { requestTargetRayInfo } from './helpers/targetRaySpace'
import { initHitTestSource, requestHitTestPoseMatrix, updateObjectMatrixFromHit } from './helpers/hitTest'
import { initARApp } from './helpers/initARApp'
import reticle from './components/reticle'
import animate from './helpers/animate'

const container = document.createElement('div');
document.body.appendChild(container)

const arApp = initARApp()

arApp.scene.add(reticle)

// const selectRay = new THREE.Raycaster()

// const checkIntersections = (screenPos) => {
//   // console.log('looking for intersection')


//   selectRay.setFromCamera(screenPos, camera)
//   const intersects = selectRay.intersectObjects(scene.children)
//   for (let i = 0; i < intersects.length; i++) {
//     intersects[i].object.geometry.scale(1.5, 1.5, 1.5)
//   }
// }




// const wolf = await loadGLTF('./assets/wolf_gltf/Wolf-Blender-2.82a.gltf')
// wolf.visible = false
// scene.add(wolf)



// let session = renderer.xr.getSession()
// session.addEventListener('select', (e) => onSelectSession(e))
// function onSelectSession(event) {
//}
// CREATE EVENT LISTENER FOR WEBXR SELECT EVENT
arApp.controller.addEventListener('select', (e) => { onSelectController(e) })
// function onSelect() {
//   if (reticle.visible) {
//     wolf.position.setFromMatrixPosition(reticle.matrix)
//     wolf.visible = true
//   }
// }
function onSelectController(event) {
  // const touch = new THREE.Vector2(0, 0)

  // const targetRayPose = frame.
  // checkIntersections(touch)

  // const controllerPosition = new THREE.Vector3()
  // controllerPosition.setFromMatrixPosition(controller.matrixWorld)
}


//EVENT HANDLER FOR WINDOW TOUCH, DOES NOT WORK, ATLEAST NOT IN EMULATION 
window.addEventListener('touchstart', (e) => { onTouch(e) })
function onTouch(event) {
  const { clientX, clientY } = event.touches[0]
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
  onStartCallback: (session) => {
    arApp.session = session
    initHitTestSource(arApp.session)
    container.appendChild(arApp.renderer.domElement)
  },
}))

animate(arApp, renderARApp)


