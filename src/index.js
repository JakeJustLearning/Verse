import * as THREE from 'three'
import { ARButton } from 'three/examples/jsm/webxr/ARButton'
import renderer from './renderer'
import { loadGLTF } from './loader'

console.log('wee')
let container;
let scene;
let camera;
let reticle;
let hitTestSource = null
let hitTestSourceRequested = false

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

  const controller = renderer.xr.getController(0)
  controller.addEventListener('select', onSelect)

  function onSelect() {
    if (reticle.visible) {
      wolf.position.setFromMatrixPosition(reticle.matrix)
      wolf.visible = true
    }
  }

  reticle = new THREE.Mesh(
    new THREE.RingGeometry(0.15, .2, 32).rotateX(-Math.PI / 2),
    new THREE.MeshBasicMaterial({ color: 'green' })
  )
  reticle.matrixAutoUpdate = false
  reticle.visible = false
  scene.add(reticle)


  const wolf = await loadGLTF('./assets/wolf_gltf/Wolf-Blender-2.82a.gltf')
  wolf.visible = false
  scene.add(wolf)


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
  // runHitTest(renderer, timestamp, frame, reticle)
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
  renderer.render(scene, camera)
}


init()
animate()





// document.body.appendChild(ARButton.createButton(renderer))


