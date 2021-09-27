import * as THREE from 'three'
import { ARButton } from './components/ARButton'
// import { loadGLTF } from './components/loader'
import { initHitTestSource, requestHitTestPoseMatrix, updateObjectMatrixFromHit } from './helpers/hitTest'
import { initARApp } from './helpers/initARApp'
import reticle from './components/reticle'
import animate from './helpers/animate'

const container = document.createElement('div');
document.body.appendChild(container)

const arApp = initARApp()

arApp.scene.add(reticle)

const selectRay = new THREE.Raycaster()

function checkIntersections(origin, direction) {
  console.log('looking for intersection')
  selectRay.set(origin, direction)
  const intersects = selectRay.intersectObjects(arApp.scene.children)
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


// function onSelect() {
//   if (reticle.visible) {
//     wolf.position.setFromMatrixPosition(reticle.matrix)
//     wolf.visible = true
//   }
// }

function onSelectController(event) {
  const touchOrigin = new THREE.Vector3().setFromMatrixPosition(arApp.controller.matrixWorld)
  const cameraPosition = new THREE.Vector3().setFromMatrixPosition(arApp.camera.matrixWorld)
  const directionFromCamera = touchOrigin.clone().sub(cameraPosition).normalize()
  checkIntersections(touchOrigin, directionFromCamera)
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


