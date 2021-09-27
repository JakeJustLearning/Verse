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
const arrowHelper = new THREE.ArrowHelper(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), 2, 0xffff00)
arrowHelper.visible = false
arApp.scene.add(arrowHelper)

const selectRay = new THREE.Raycaster()

function checkIntersections(origin, direction) {
  // console.log('looking for intersection')
  selectRay.set(origin, direction)
  const intersects = selectRay.intersectObjects(arApp.scene.children)
  if (intersects[0]) intersects[0].object.rotateX(25)
  arrowHelper.position.set(origin)
  arrowHelper.setDirection(direction)
  arrowHelper.visible = true
}

// const wolf = await loadGLTF('./assets/wolf_gltf/Wolf-Blender-2.82a.gltf')
// wolf.visible = false
// scene.add(wolf)

// function onSelect() {
//   if (reticle.visible) {
//     wolf.position.setFromMatrixPosition(reticle.matrix)
//     wolf.visible = true
//   }
// }

async function onSelectController(event) {
  const touchOrigin = new THREE.Vector3()
  touchOrigin.set(0, 0, 0).applyMatrix4(arApp.controller.matrixWorld)
  const touchDirection = new THREE.Vector3()
  touchDirection.set(0, 0, -1).applyMatrix4(arApp.controller.matrixWorld)
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


