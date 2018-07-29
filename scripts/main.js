// set up global vars
var fieldOfView = 45;
var aspect = window.innerWidth / window.innerHeight;
var nearClippingPlane = .1;
var farClippingPlane = 1000;
var cube;

// create a scene object
// add a basic scene, which will be the container for your objects. The scene is the stage that will render with the camera. All 3D presentations will have a scene or stage of some form. What is in that stage and in view of the camera is what the user will see.
var scene = new THREE.Scene();

//create a camera
// The first attribute is the field of view of the camera. The second is the aspect ratio (width/height). Then you indicate the near clipping plane and the far clipping plane distances, which defines what is to be visible to the camera.
var camera = new THREE.PerspectiveCamera(fieldOfView, aspect, nearClippingPlane, farClippingPlane);

// create a renderer
// The renderer handles the drawing of the objects in your scene that are visible to the camera you defined. You can set options via a JSON formatted set of values. Here we are setting the ‘antialias’ property to true, to get smooth edges on our object. You can also define the size of the draw area, as we have here, to full screen.
var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);


// The renderer creates a domElement that is actually a HTML canvas element that you can then append to the body. You can optionally specify an existing canvas element to draw to if you prefer, via the ‘canvas’ attribute of the renderer.
document.body.appendChild(renderer.domElement);

// create a 3D object
// Three.js includes lots of great primitive geometries to choose from including sphere, torus and cylinders. Try starting with a simple cube. The first three attributes are width, height and depth. Optionally, you can also define the segments of each of those sides of the cube using the next three attributes.
var geometry = new THREE.BoxGeometry(4, 2, .1);

// a material is required. Three.js includes a range of materials including physical shaders, lambert, phong and custom shaders. You can set textures such using video or images as well. Use a MeshNormalMaterial for now. This way you can see the object without needing to light it. We’ll get into lighting and materials in the next tutorial.
var material = new THREE.MeshNormalMaterial();

// Next, you create a mesh, which is a combination of the geometry and material you just defined. Physical objects in 3D require a geometry that defines the faces, vertices and drawing of the shape. They also require a material or skin to cover that object so we can see it.
var cube = new THREE.Mesh(geometry, material);

// By default, when ‘scene.add()’ is called to add an object, it is placed at (0,0,0). To avoid the camera and the object being in the same location, we can move the camera back a little, ( z= 5 ). You could also move your objects and leave the camera at 0. Use the following code, to add your cube:
scene.add(cube);
// move camera back
camera.position.z = 5;

// Segments are the number of triangles or faces used to draw the shape. The more segments the smoother the object. Flat sides of a cube like this can get away with the default of 1 or 2. To test out the wireframe option and see the segments, use this line of code instead of the previous one for defining material:
var material = new THREE.MeshNormalMaterial({wireframe: true});

// Now that you have a scene and a camera, along with a 3D object in your scene, you can render it. Rendering is the function of drawing the data to the canvas. It will draw to the canvas you indicated when you created it (either the generated one or using the ‘canvas’ attribute). Use this code now to see your cube!
renderer.render(scene, camera);

// render the scene
// To animate scenes smoothly you need to render at least 24 frames per second (ideally 60 fps). You will bind your ‘render’ function in a loop to the ‘requestAnimationFrame’ function. It will optimally run at 60 fps, and ensure the browser is ready to render the next frame. Replace your render line with this new code:
var render = function() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
};
render();

// window resize handler
// It’s a good idea to add a window resize event handler to the code. It will keep it looking great, if the screen size changes or if the phone gets rotated. All you need to do is update the camera aspect, the ‘projectMatrix’ and the renderer size as resizing occurs.
window.addEventListener("resize", function() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}, false);


// If you haven’t already, remove the ‘wireframe’ attribute from the material so you can see the shaded cube. It will look nicer when you animate it. All objects have a ‘rotation’ property. In Three.js these are in radians not degrees. radians = degrees × (Math.PI /180).
cube.rotation.y = Math.PI / 180 * 45;
cube.rotation.z = Math.PI / 180 * -25;
// alternative format
cube.rotation.set(0, Math.PI / 180 * 45, Math.PI / 180 * -25);

// Similar to rotation, you can change an object’s position in 3D space. The Z axis points towards the camera by default, the Y axis is up and down, and the X axis runs horizontally across the screen. Experiment with the position values to get the idea. Units are in metres, when you start working in VR/AR projects.
cube.position.x = 1;
cube.position.z = .1;
cube.position.y = -.1;
// alternative format
cube.position.set(1, .1, -.1);

// render the scene
// To animate the cube’s rotation we can add the rotation code inside the render loop. This will update the rotation every frame. You can simply increment its rotation each frame.
var render = function() {
  requestAnimationFrame(render);
  cube.rotation.x += 0.01;
  cube.rotation.z -= 0.01;
  renderer.render(scene, camera);
};
render();

// Incrementing in a linear way like we just did is good in some cases, but you can apply any form of easing or maths you like to your animations. Try using the JavaScript ‘sine’ or ‘cosine’ functions to give some easing to your position animations to finish of with a really smooth efect.
cube.position.x = 2 * Math.sin(cube.rotation.x);
cube.position.z = 2 * Math.sin(cube.rotation.z);
