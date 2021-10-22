// import ThreeMeshUI from 'three-mesh-ui'
import * as THREE from 'three'
import { loadGLTF } from '../components/loader'

export function createHudButtons(arApp) {
  const scaleFactor = .1
  const hud = {}

  arApp.assets.forEach(asset => {
    createModelButton(asset.path, asset.name, arApp.scene, scaleFactor)
  })
  return hud
}

function createModelButton(path, name, buttonGroup, scaleFactor) {
  console.log(path, name)
  function onButtonModelLoad(model) {
    console.log(model)
    const scaledModel = scaleModelToButton(model.scene.children[0], scaleFactor)
    scaledModel.cloneGLTF = (onLoad) => {
      loadGLTF(path, name, onLoad)
    }
    buttonGroup.add(scaledModel)
    scaledModel.name = name
    scaledModel.visible = true
    scaledModel.position.set(-.05, .05, -.35 + (buttonGroup.userData.lastBox?.position?.x || 0))
    buttonGroup.userData.lastBox = scaledModel
  }
  loadGLTF(path, name, onButtonModelLoad)
}


function scaleModelToButton(model, scaleFactor) {
  model.animations = null
  let box = new THREE.Box3().setFromObject(model)
  let max = box.max
  let min = box.min
  let dif = {
    x: max.x - min.x,
    y: max.y - min.y
  }
  dif.x > dif.y ? dif.high = 'x' : dif.high = 'y'
  model.userData.scaled = dif[dif.high] * scaleFactor
  model.scale.set(model.userData.scaled, model.userData.scaled, model.userData.scaled)
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(.05, .05, .05)
  )
  mesh.position.setFromMatrixPosition(model.matrixWorld)
  mesh.material.wireframe = true
  mesh.add(model)
  model.translateY(-.025)
  mesh.userData.isPlaceable = true
  return mesh
}

