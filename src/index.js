import * as THREE from 'three';
import { ARButton } from './components/ARButton';
import { initHitTestSource, requestHitTestPoseMatrix, updateObjectMatrixFromHit } from './helpers/hitTest';
import { initARApp } from './helpers/initARApp';
import reticle from './components/reticle';
import animate from './helpers/animate';
import routeSelect from './helpers/onSelectController';

const container = document.createElement('div');
document.body.appendChild(container);

const arApp = initARApp();

arApp.scene.add(reticle);

const selectRay = new THREE.Raycaster();

function checkIntersections(origin, direction) {
  selectRay.set(origin, direction);
  const intersects = selectRay.intersectObjects(arApp.scene.children);
  if (intersects[0]) {
    let intersection = intersects[0].object;
    console.log('intersections found', intersection);
    intersection.material.color.set(0xffffff * Math.random());
    return intersection;
  }
  return null;
}

function onSelectController(event) {
  const touchOrigin = new THREE.Vector3().setFromMatrixPosition(arApp.controller.matrixWorld);
  const cameraPosition = new THREE.Vector3().setFromMatrixPosition(arApp.camera.matrixWorld);
  const directionFromCamera = touchOrigin.clone().sub(cameraPosition).normalize();
  const intersection = checkIntersections(touchOrigin, directionFromCamera);
  routeSelect(arApp, intersection);
}

function renderARApp(timestamp, frame) {
  if (frame && arApp.session) {
    const hitPoseMatrix = requestHitTestPoseMatrix(timestamp, frame, arApp.session, arApp.renderer);
    if (hitPoseMatrix) {
      updateObjectMatrixFromHit(reticle, hitPoseMatrix);
      reticle.visible = true;
    } else {
      reticle.visible = false;
    }
  }
  if (arApp.selectedObject) {
    spinSelectedObject(arApp.selectedObject);
  }
  arApp.renderer.render(arApp.scene, arApp.camera);
}

document.body.appendChild(ARButton.createButton(arApp.renderer, {
  domOverlay: {
    root: document.body
  },
  onStartCallback: async (session) => {
    arApp.session = session;
    await initHitTestSource(arApp.session);
    container.appendChild(arApp.renderer.domElement);
    arApp.controller = arApp.renderer.xr.getController(0);
    arApp.controller.addEventListener('select', (e) => {
      onSelectController(e);
    });
  },
}));

animate(arApp, renderARApp);


function spinSelectedObject(object) {
  object.rotateX(.02);
  object.rotateY(.01);
}

