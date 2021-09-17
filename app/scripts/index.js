import * as THREE from 'three'
import { ARButton } from 'three/examples/jsm/webxr/ARButton'


const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  .01,
  50
)

document.body.appendChild(ARButton.createButton(renderer))


