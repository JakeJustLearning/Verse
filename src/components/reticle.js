import * as THREE from 'three'

const reticle = new THREE.Mesh(
  new THREE.RingGeometry(0.15, .2, 32).rotateX(-Math.PI / 2),
  new THREE.MeshBasicMaterial({ color: 'green' })
)
reticle.matrixAutoUpdate = false
reticle.visible = false
reticle.name = 'reticle'

export default reticle