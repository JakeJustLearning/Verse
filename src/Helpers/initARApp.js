import * as THREE from 'three'
import { initRenderer } from '../components/renderer'
import { addResizeEventListener } from './resizeWindow.utility'
import { loadGLTF } from '../components/loader'
import addStartObjectsToScene from './onSceneStartObjects'
import { createHudButtons } from '../components/hud'


// initializes and returns an arApp object with the renderer,camera, scene, and controller

export function initARApp() {

  const arApp = {}
  arApp.source = {}

  arApp.renderer = initRenderer()

  arApp.scene = new THREE.Scene()

  arApp.camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    .01,
    20
  )

  arApp.controller = arApp.renderer.xr.getController(0)
  //IMPORTANT!
  arApp.scene.add(arApp.controller)

  addResizeEventListener(arApp)

  addStartObjectsToScene(arApp.scene)

  arApp.assets = [
    { name: 'wolf', path: '../src/assets/wolf_gltf/Wolf-Blender-2.82a.gltf' },
  ]

  arApp.hud = createHudButtons(arApp)

  return arApp
}