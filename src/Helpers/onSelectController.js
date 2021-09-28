
function routeSelect(arApp, selectedObject) {
  if (arApp.selectedObject?.userData.isPlaceable) {
    if (arApp.selectedObject === selectedObject) {
      arApp.selectedObject = null
    } else {
      placeSelectedObject(arApp, arApp.selectedObject, arApp.scene.getObjectByName('reticle'))
    }
  } else {
    arApp.selectedObject = selectedObject || null
  }
}



function placeSelectedObject(arApp, object, reticle) {
  console.log('into the clone')
  object.cloneGLTF((gltf) => {
    let model = gltf.scene.children[0]
    model.position.setFromMatrixPosition(reticle.matrix)
    arApp.scene.add(model)
    console.log(arApp.scene.children)
  })
}


export default routeSelect



