// import ThreeMeshUI from 'three-mesh-ui'
import * as THREE from 'three'
import { loadGLTF } from '../components/loader'

export function createHudButtons(arApp) {
  const scaleFactor = .1
  const hud = {}
  const buttonGroupHud = new THREE.Group()
  buttonGroupHud.position.set(0, 0, -.35)

  hud.updateHudPosition = () => {
    buttonGroupHud.position.applyMatrix4(arApp.camera.matrixWorld)
    buttonGroupHud.quaternion.setFromRotationMatrix(arApp.camera.matrixWorld)
  }

  arApp.assets.forEach(asset => {
    createModelButton(asset.path, asset.name, buttonGroupHud, scaleFactor)
  })

  arApp.scene.add(buttonGroupHud)
  return hud
}

function createModelButton(path, name, buttonGroup, scaleFactor) {
  // const outerButtonBox = new THREE.Box3
  function onButtonModelLoad(model) {
    console.log('in create button', model)
    const scaledModel = scaleModelToButton(model.scene.children[0], scaleFactor)
    // outerButtonBox.setFromObject(scaledModel)
    // buttonGroup.add(outerButtonBox)
    buttonGroup.add(scaledModel)
    scaledModel.position.set(0, .2, -.35)
    buttonGroup.userData.lastBox = scaledModel
  }
  loadGLTF(path, name, onButtonModelLoad)
}


function scaleModelToButton(model, scaleFactor) {
  console.log(model)
  let box = new THREE.Box3().setFromObject(model)
  let max = box.max
  let min = box.min
  let dif = {
    x: max.x - min.x,
    y: max.y - min.y
  }
  dif.x > dif.y ? dif.high = 'x' : dif.high = 'y'
  model.userData.scaled = dif[dif.high] / scaleFactor
  model.scale.set(new THREE.Vector3(model.userData.scaled, model.userData.scaled, model.userData.scaled))
  return model
}

