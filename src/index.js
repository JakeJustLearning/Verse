import * as THREE from 'three'
import { ARButton } from 'three/examples/jsm/webxr/ARButton'
import renderer from './renderer'
import { loadGLTF } from './loader'

console.log('wee')
let container
let scene
let camera

const init = async () => {
  container = document.createElement('div');
  document.body.appendChild(container)



  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    .01,
    50
  )


  function resize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  window.addEventListener('resize', resize())

  const wolf = await loadGLTF('./assets/wolf_gltf/Wolf-Blender-2.82a.gltf')
  const geometry = new THREE.BoxGeometry()
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })

  const cube = new THREE.Mesh(geometry, material)
  cube.position.set(0)
  const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1)
  light.position.set(0.5, 1, 0.25)

  scene.add(cube)
  scene.add(light)
  scene.add(wolf)

  camera.position.z = 5

  container.appendChild(renderer.domElement)

  document.body.appendChild(ARButton.createButton(renderer, {
    domOverlay: {
      root: document.body
    }
  }))

}

function animate() {
  renderer.setAnimationLoop(render)
}
function render() {
  renderer.render(scene, camera)
}


init()
animate()





// document.body.appendChild(ARButton.createButton(renderer))


