import { WebGLRenderer } from 'three'

const renderer = new WebGLRenderer({ antialias: true, alpha: true })
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.xr.enabled = true

renderer.hitTesting = false

runHitTest = (remderer, timestamp, frame) => {
  if (frame) {
    const referenceSpace = renderer.xr.getReferenceSpace()
    const session = renderer.xr.getSession()
  }
}




export default renderer