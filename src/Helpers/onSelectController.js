
function routeSelect(arApp, selectedObject) {
  if (!selectedObject?.isPlaceable && selectedObject) {
    arApp.selectedObject = selectedObject
  }
  else if (arApp.selectedObject?.userData.isPlaceable) {
    if (arApp.selectedObject === selectedObject) {
      arApp.selectedObject = null
    } else {
      placeSelectedObject(arApp, arApp.selectedObject, arApp.scene.getObjectByName('reticle'))
    }
  } else {
    arApp.selectedObject = null
  }
}



function placeSelectedObject(arApp, object, reticle) {
  object.cloneGLTF((gltf) => {
    let model = gltf.scene.children[0]
    model.position.setFromMatrixPosition(reticle.matrix)
    arApp.scene.add(model)
  })
}


export default routeSelect



