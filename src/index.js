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
let targetRayPose

const selectRay = new THREE.Raycaster()

function checkIntersections(screenPos) {
  // console.log('looking for intersection')
  selectRay.setFromCamera(screenPos, arApp.camera)
  const intersects = selectRay.intersectObjects(arApp.scene.children)
  if (intersects[0]) intersects[0].object.rotateX(25)
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
arApp.renderer.domElement.addEventListener('touchStart', (e) => {
  e.preventDefault()
  onSelectController(e)
})
// function onSelect() {
//   if (reticle.visible) {
//     wolf.position.setFromMatrixPosition(reticle.matrix)
//     wolf.visible = true
//   }
// }
function onSelectController(event) {
  console.log('on controller event', event)
  const touch = new THREE.Vector2(0, 0)
  touch.x = event.touches[0].pageX
  touch.y = event.touches[0].pageY
  console.log(touch)
  checkIntersections(touch)

  // const targetRayPose = frame.

  // const controllerPosition = new THREE.Vector3()
  // controllerPosition.setFromMatrixPosition(controller.matrixWorld)
}

// function testaddblocktoscene() {
//   const geo = new THREE.BoxGeometry(1, 1, 1)
//   const material = new THREE.MeshBasicMaterial({ color: 0xffffff * Math.random() })
//   const box = new THREE.Mesh(geo, material)
//   box.position.setFromMatrixPosition(reticle.matrix)
//   box.visible = true
//   arApp.scene.add(box)
// }


//EVENT HANDLER FOR WINDOW TOUCH, DOES NOT WORK, ATLEAST NOT IN EMULATION 
window.addEventListener('touchstart', (e) => { onTouch(e) })
function onTouch(event) {
  const { clientX, clientY } = event.touches[0]
}

function renderARApp(timestamp, frame) {
  if (frame && arApp.session) {
    // handle onSelect in renderFrame
    if (arApp.source.onSelect) {
      let event = arApp.source.onSelect
      // let frame = event.frame
      let targetRaySpace = event.inputSource.targetRaySpace
      let targetRayPose
      arApp.session.requestReferenceSpace('viewer')
        .then(refSpace => {
          console.log({ targetRaySpace, refSpace, frame })
          targetRayPose = frame.getPose(targetRaySpace, refSpace)
          console.log(targetRayPose)
          // console.log(targetPose)
        })
    }


    const hitPoseMatrix = requestHitTestPoseMatrix(timestamp, frame, arApp.session, arApp.renderer)
    if (hitPoseMatrix) {
      updateObjectMatrixFromHit(reticle, hitPoseMatrix)
      reticle.visible = true
    } else {
      reticle.visible = false
    }
  }
  arApp.source.onSelect = null
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
    // arApp.session.addEventListener('select', (e) => { onSelectSession(e) })
    // arApp.session.addEventListener('select', (event) => {
    //   if (event.inputSource.targetRayMode == 'screen') {
    //     // arApp.source.onSelect = event
    //     let frame = event.frame
    //     let targetRaySpace = event.inputSource.targetRaySpace
    //     let targetRayPose
    //     frame.session.requestReferenceSpace('viewer')
    //       .then(refSpace => {
    //         console.log({ targetRaySpace, refSpace, frame })
    //         targetRayPose = frame.getPose(targetRaySpace, refSpace)
    //         console.log(targetRayPose)

    //       })

    //     if (targetRayPose) {
    //       console.log(targetRayPose)
    //       testaddblocktoscene()
    //     }
    //   }
    //   arApp.source.onSelect = event.inputSource
    // })
  },
}))

animate(arApp, renderARApp)


