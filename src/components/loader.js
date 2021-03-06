import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'


const loader = new GLTFLoader()
loader.loading = false

//this loader is actually asynchronous
export function loadGLTF(path, name, onLoaded) {
  loader.loading = true
  loader.load(
    path,
    (gltf) => {
      gltf.clone = () => { gltf.scene.clone(true) }
      gltf.scene.name = name
      onLoaded(gltf)
      loader.loading = false
    },
    (xhr) => { console.log((xhr.loaded / xhr.total * 100) + '% model loded') },
    (err) => { console.log('model loader error', err) }
  )
}