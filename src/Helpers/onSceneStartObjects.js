//organization and gathering of objects to be established and immidiately added to the scene at start
import * as THREE from 'three'

const startObjects = []

// LIGHTS!
const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1)
light.position.set(0.5, 1, 0.25)
startObjects.push(light)

const directionalLight = new THREE.DirectionalLight();
directionalLight.position.set(0.2, 1, 1);
startObjects.push(directionalLight)

// Test Boxes
const boxGeo = new THREE.BoxGeometry(.2, .2, .2)
const boxMesh = new THREE.MeshBasicMaterial({ color: 0xffffff * Math.random() })

const boxOne = new THREE.Mesh(
  boxGeo,
  new THREE.MeshBasicMaterial({ color: 0xffffff * Math.random() })
)
boxOne.position.set(-1.5, 0, - 1)
const boxTwo = new THREE.Mesh(
  boxGeo,
  new THREE.MeshBasicMaterial({ color: 0xffffff * Math.random() })
)
boxTwo.position.set(0, 0, - 1)

const boxThree = new THREE.Mesh(
  boxGeo,
  new THREE.MeshBasicMaterial({ color: 0xffffff * Math.random() })
)
boxThree.position.set(1.5, 0, - 1)
startObjects.push(...[boxOne, boxTwo, boxThree])

function addStartObjectsToScene(scene) {
  startObjects.forEach(obj => scene.add(obj))
}

export default addStartObjectsToScene
