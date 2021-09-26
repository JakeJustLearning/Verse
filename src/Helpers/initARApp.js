import * as THREE from 'three'
import { initRenderer } from '../components/renderer'
import { addResizeEventListener } from './utilities/resizeWindow.utility'


// initializes and returns an arApp object with the renderer,camera, scene, and controller

export function initARApp() {

  const arApp = {}

  arApp.renderer = initRenderer()

  arApp.scene = new THREE.Scene()

  arApp.camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    .01,
    20
  )

  arApp.controller = arApp.renderer.xr.getController(0)

  addResizeEventListener(arApp)

  return arApp
}