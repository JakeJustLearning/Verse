# Lizard: in Browser AR

## Summary

This demo shows off some of the features available for in browser immersive AR experiences. As we move toward metaverse interactions we will need to be able to intuitively interact with the digital world, and accurately overlay the digital world with the physical one. In this way we can provide a consistant metaverse experience and make digital interaction more "real" and physical.

## Install

download the repo to local and install dependencies through npm or yarn.

## local running and use

WebXR is an experimental web standard and therefore requires special set up to run and test locally.

### HTTPS:

Immersive AR features through WebXR are only available through a secure https server. in VScode [live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) can be used to set up an https local server. You can also use [mkcert](https://github.com/FiloSottile/mkcert) to create a localhost certificates to run https.

### Veiwing WebXR Content

**In Browser** Immersive AR content can be viewed in the browser with the use of [WebXR API Emulator](https://chrome.google.com/webstore/detail/webxr-api-emulator/mjddjgeghkdijejnciaefnkjmkafnnje?hl=en#:~:text=WebXR%20Emulator%20extension%20enables%20users,with%20their%20controllers%20to%20emulate.) for google chrome.

**On Android:** Android devices can use the latest version of chrome to access a locally hosted instance and view webXR content if the device is on the same network as the hosting device.

**On iOS:** Safari does not natively support webXR content. One must download [WebXR Veiwer browser](https://apps.apple.com/us/app/webxr-viewer/id1295998056) from amzaon. As well webXR Veiwer does not play well with locally hosted HTTPS instances. However the application can be easily deployed through github pages, or any other hosting service and then accessed. This project is set up to use github pages out of the box.

## Features and demonstrations

### Real world object hit testing:

the hit testing helpers is responsible for detecting real world planes both horizontal and verticle. It then is able to translate the orientation and positioning of that to the reticle object ring. As well as provide that information to allow for the placement of a model at the hit.

![plane detection demo](https://github.com/JakeJustLearning/Lizard/blob/main/src/assets/demoGifs/planeDetection.gif)

### Digital object selection

The ability to allow users to ituitively interact with digital obkects. We need to understand from the users input on their screen where they are trying to extend their reach into the digital world. The WebXR uses raycasting in combination with some spacial math to understand the relationship between your touch, the camera's view, and the XRcontroller(mobile device) to position the ray and detect intersections with digital objects.

![plane detection demo](https://github.com/JakeJustLearning/Lizard/blob/main/src/assets/demoGifs/touchInteraction.gif)
