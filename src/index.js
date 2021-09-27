// import * as THREE from 'three'
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
arApp.controller.addEventListener('select', (e) => { onSelectController(e) })
// function onSelect() {
//   if (reticle.visible) {
//     wolf.position.setFromMatrixPosition(reticle.matrix)
//     wolf.visible = true
//   }
// }
function onSelectController(event) {
  console.log('on controller event', event)
  console.log(controller)
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
    //handle onSelect in renderFrame
    // if (arApp.source.onSelect) {
    //   if (arApp.session.hitTestSource) {
    //     let targetPose = frame.getPose(
    //       arApp.source.onSelect.targetRaySpace,
    //       arApp.session.hitTestSource
    //     )
    //     console.log(targetPose)
    //   }
    // }


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
  onStartCallback: (session) => {
    arApp.session = session
    initHitTestSource(arApp.session)
    container.appendChild(arApp.renderer.domElement)
    // arApp.session.addEventListener('select', (e) => { onSelectSession(e) })
    arApp.session.addEventListener((event) => {
      if (event.inputSource.targetRayMode == 'screen') {
        let targetRayPose = event.frame.getPose(event.inputSource.targetRaySpace, arApp.session.hitTestSource)
        if (targetRayPose) {
          console.log(targetRayPose)
        }
      }
      arApp.source.onSelect = event.inputSource
    })
  },
}))

animate(arApp, renderARApp)


