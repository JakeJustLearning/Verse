//organization and gathering of objects to be established and immidiately added to the scene at start
import * as THREE from 'three'

const startObjects = []

// LIGHTS!
const light = new THREE.HemisphereLight(0x606060, 0x404040)
startObjects.push(light)

const directionalLight = new THREE.DirectionalLight(0xffffff)
directionalLight.position.set(0.2, 1, 1).normalize()
startObjects.push(directionalLight)

// Test Boxes

const boxOne = new THREE.Mesh(
  new THREE.BoxGeometry(.2, .2, .2),
  new THREE.MeshBasicMaterial({ color: 0xffffff * Math.random() })
)
boxOne.position.set(-1.5, 0, - 1)
const boxTwo = new THREE.Mesh(
  new THREE.BoxGeometry(.2, .2, .2),
  new THREE.MeshBasicMaterial({ color: 0xffffff * Math.random() })
)
boxTwo.position.set(0, 0, - 1)

const boxThree = new THREE.Mesh(
  new THREE.BoxGeometry(.2, .2, .2),
  new THREE.MeshBasicMaterial({ color: 0xffffff * Math.random() })
)
boxThree.position.set(1.5, 0, - 1)
startObjects.push(...[boxThree])

function addStartObjectsToScene(scene) {
  startObjects.forEach(obj => scene.add(obj))
}

export default addStartObjectsToScene
