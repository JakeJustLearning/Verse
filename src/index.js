import * as THREE from 'three'
import { ARButton } from './Helpers/ARButton'
import renderer from './renderer'
import { loadGLTF } from './loader'
import { requestTargetRayInfo } from './InteractionHelpers/TargetRaySpace.helper'
import {initHitTestSource,requestHitTestPoseMatrix} from './Helpers/hitTest'

let container;
let scene;
let camera;
let controller;
let reticle;
// let hitTestSource = null
// let hitTestSourceRequested = false
let sessionEval
let prevSessionEval


let Session

const selectRay = new THREE.Raycaster()

const checkIntersections = (screenPos) => {
  // console.log('looking for intersection')


  selectRay.setFromCamera(screenPos, camera)
  const intersects = selectRay.intersectObjects(scene.children)
  for (let i = 0; i < intersects.length; i++) {
    intersects[i].object.geometry.scale(1.5, 1.5, 1.5)
  }
}

const init = async () => {
  container = document.createElement('div');
  document.body.appendChild(container)



  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    .01,
    20
  )
  // camera.position.set(0, 1.6, 3)

  function resize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  window.addEventListener('resize', resize())

  controller = renderer.xr.getController(0)

  // let session = renderer.xr.getSession()
  // session.addEventListener('select', (e) => onSelectSession(e))
  // function onSelectSession(event) {
  //}
  // CREATE EVENT LISTENER FOR WEBXR SELECT EVENT
  controller.addEventListener('select', (e) => { onSelectController(e) })
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







  reticle = new THREE.Mesh(
    new THREE.RingGeometry(0.15, .2, 32).rotateX(-Math.PI / 2),
    new THREE.MeshBasicMaterial({ color: 'green' })
  )
  reticle.matrixAutoUpdate = false
  reticle.visible = false
  scene.add(reticle)

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


  scene.add(boxOne)
  scene.add(boxTwo)
  scene.add(boxThree)
  // const wolf = await loadGLTF('./assets/wolf_gltf/Wolf-Blender-2.82a.gltf')
  // wolf.visible = false
  // scene.add(wolf)


  // const geometry = new THREE.BoxGeometry()
  // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })

  // const cube = new THREE.Mesh(geometry, material)
  // cube.position.set(0)
  // scene.add(cube)
  const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1)
  light.position.set(0.5, 1, 0.25)

  scene.add(light)


  container.appendChild(renderer.domElement)

  document.body.appendChild(ARButton.createButton(renderer, {

    domOverlay: {
      root: document.body
    },
    onStartCallback: (session) => {
      Session = session
      initHitTestSource(Session)

    }
  }))
}

// const runHitTest = (renderer, timestamp, frame, reticle) => {
//   if (frame) {
//     const referenceSpace = renderer.xr.getReferenceSpace()
//     const session = renderer.xr.getSession()

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


function animate() {
  renderer.setAnimationLoop(render)
}
function render(timestamp, frame) {
  if(frame && Session) {

    const hitPoseMatrix = requestHitTestPoseMatrix(timestamp,frame,Session,renderer)
    if(hitPoseMatrix) {
      console.log(hitPoseMatrix)
      reticle.visible = true
      reticle.matrix.fromArray(hitPoseMatrix)
      // console.log(hitPose.transfrom.matrix)
    } else {
      reticle.visible = false
    }
  }
    // runHitTest(renderer, timestamp, frame, reticle)
  // if (frame) {
  //   const referenceSpace = renderer.xr.getReferenceSpace()
  //   const session = renderer.xr.getSession()
  //   if (hitTestSourceRequested === false) {
  //     session.requestReferenceSpace('viewer')
  //       .then(referenceSpace => {
  //         session.requestHitTestSource({ space: referenceSpace })
  //           .then(source => {
  //             hitTestSource = source
  //           })
  //       })
  //     session.addEventListener('end', function () {
  //       hitTestSourceRequested = false
  //       hitTestSource = null
  //     })
  //     hitTestSourceRequested = true
  //   }
  //   if (hitTestSource) {
  //     const hitTestResults = frame.getHitTestResults(hitTestSource);
  //     if (hitTestResults.length) {
  //       const hit = hitTestResults[0]

  //       reticle.visible = true
  //       reticle.matrix.fromArray(hit.getPose(referenceSpace).transform.matrix)
  //     } else {
  //       reticle.visbile = false
  //     }
  //   }
  // }
  renderer.render(scene, camera)
}


init()
animate()





// document.body.appendChild(ARButton.createButton(renderer))


