import * as THREE from 'three'
import { ARButton } from './components/ARButton'
import { renderer } from './components/renderer'
import { loadGLTF } from './components/loader'
import { requestTargetRayInfo } from './helpers/interactionHelpers/targetRaySpace'
import { initHitTestSource, requestHitTestPoseMatrix } from './helpers/hitTest'
import { initARApp } from './helpers/initARApp'

let container;
let reticle;

container = document.createElement('div');
document.body.appendChild(container)

const arApp = initARApp()


// let Session

// const selectRay = new THREE.Raycaster()

// const checkIntersections = (screenPos) => {
//   // console.log('looking for intersection')


//   selectRay.setFromCamera(screenPos, camera)
//   const intersects = selectRay.intersectObjects(scene.children)
//   for (let i = 0; i < intersects.length; i++) {
//     intersects[i].object.geometry.scale(1.5, 1.5, 1.5)
//   }
// }

// const init = async () => {



//   scene = new THREE.Scene()
//   camera = new THREE.PerspectiveCamera(
//     70,
//     window.innerWidth / window.innerHeight,
//     .01,
//     20
//   )
//   // camera.position.set(0, 1.6, 3)

//   function resize() {
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
//     renderer.setSize(window.innerWidth, window.innerHeight);
//   }

//   window.addEventListener('resize', resize())

//   controller = renderer.xr.getController(0)


const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1)
light.position.set(0.5, 1, 0.25)

arApp.scene.add(light)

reticle = new THREE.Mesh(
  new THREE.RingGeometry(0.15, .2, 32).rotateX(-Math.PI / 2),
  new THREE.MeshBasicMaterial({ color: 'green' })
)
reticle.matrixAutoUpdate = false
reticle.visible = false
arApp.scene.add(reticle)

const boxGeo = new THREE.BoxGeometry(.2, .2, .2)
const boxMesh = new THREE.MeshBasicMaterial({ color: 0xffffff * Math.random() })

const boxOne = new THREE.Mesh(
  boxGeo,
  boxMesh
)
boxOne.position.set(2, 0, - 1)

const boxTwo = new THREE.Mesh(
  boxGeo,
  boxMesh
)
boxTwo.position.set(0, 0, - 1)

const boxThree = new THREE.Mesh(
  boxGeo,
  boxMesh
)
boxThree.position.set(2, 0, - 1)


arApp.scene.add(boxOne)
arApp.scene.add(boxTwo)
arApp.scene.add(boxThree)

// const wolf = await loadGLTF('./assets/wolf_gltf/Wolf-Blender-2.82a.gltf')
// wolf.visible = false
// scene.add(wolf)


// const geometry = new THREE.BoxGeometry()
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })

// const cube = new THREE.Mesh(geometry, material)
// cube.position.set(0)
// scene.add(cube)

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

console.log((arApp.scene.children))


function animate(arApp, renderFunc) {
  arApp.renderer.setAnimationLoop(renderFunc)
}

function renderARApp(timestamp, frame) {
  if (frame && arApp.session) {

    const hitPoseMatrix = requestHitTestPoseMatrix(timestamp, frame, arApp.session, arApp.renderer)
    if (hitPoseMatrix) {
      reticle.visible = true
      reticle.matrix.fromArray(hitPoseMatrix)
    } else {
      reticle.visible = false
    }
  }

  arApp.renderer.render(arApp.scene, arApp.camera)
}


// init()
// animate()

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


// document.body.appendChild(ARButton.createButton(renderer))


