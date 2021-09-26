import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'


const loader = new GLTFLoader()

export const loadGLTF = async (path) => {
  try {
    const modelData = await loader.loadAsync(path)
    const model = modelData.scene.children[0]
    return model
  } catch (err) {
    console.log('error while loaded GLTF file', err);
  }
}

