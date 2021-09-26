export default function animate(arApp, renderFunc) {
  arApp.renderer.setAnimationLoop(renderFunc)
}