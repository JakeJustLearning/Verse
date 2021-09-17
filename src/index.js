import * as THREE from 'three'
import { ARButton } from 'three/examples/jsm/webxr/ARButton'

console.log('wee')


const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  .01,
  50
)
const renderer = new THREE.WebGLRenderer()

renderer.setSize(window.innerWidth, window.innerHeight)

document.body.appendChild(renderer.domElement)

const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })

const cube = new THREE.Mesh(geometry, material)

scene.add(cube)

camera.position.z = 5

function animate() {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
}
animate()



// document.body.appendChild(ARButton.createButton(renderer))


