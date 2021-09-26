//utility to detect when window size changes and Resize automatically

function resize(camera,renderer) {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

export function addResizeEventListener(arApp) {
  window.addEventListener('resize', resize(arApp.camera, arApp.renderer))
}

