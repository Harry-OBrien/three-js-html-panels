import './style.scss'

import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { DoubleSide } from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
// const controls = new OrbitControls(camera, renderer.domElement);
const ambientLight = new THREE.AmbientLight(0xffffff);
const gridHelper = new THREE.GridHelper(200, 50);

// Degrees to radians
Math.radians = function (degrees) {
  return degrees * Math.PI / 180;
}

// Radians to degrees
Math.degrees = function (radians) {
  return radians * 180 / Math.PI;
}

const NUM_PANELS = 8;
const panels = [];
const PANEL_WIDTH = 12;
const PANEL_HEIGHT = 16;
const RADIUS = 40;
const PANEL_SPACING_RADS = Math.PI / 32;
const PANEL_OFFSET = 2 * Math.asin(PANEL_WIDTH / (2 * RADIUS)) + PANEL_SPACING_RADS;
const MAX_ROTATION = (NUM_PANELS - 1) * PANEL_OFFSET;

function makePanelInstance(width, height) {
  const geometry = new THREE.PlaneGeometry(width, height);
  const material = new THREE.MeshStandardMaterial({
    color: Math.random() * 0xffffff,
    side: THREE.DoubleSide,
  });

  var panel = new THREE.Mesh(geometry, material);
  return panel;
}

function lerp(x, y, a) {
  return (1 - a) * x + a * y
}

function moveCamera() {
  // const scrollOffset = document.documentElement.scrollTop;
  const scrollPercent = document.documentElement.scrollTop /
    (document.documentElement.scrollHeight - document.documentElement.clientHeight);

  const rotation = lerp(0, MAX_ROTATION, scrollPercent);
  radialLayout(panels, rotation);
}

function radialLayout(items, initOffset) {
  var offset = initOffset;
  console.log(items[0]);
  items.forEach((panel, _) => {
    const x = RADIUS * Math.sin(-offset);
    const z = RADIUS * Math.cos(-offset);

    panel.position.set(x, PANEL_HEIGHT / 2, z);
    panel.rotation.set(0, -offset, 0);
    offset -= PANEL_OFFSET;
  });
}

function createPanels() {
  for (var i = 0; i < NUM_PANELS; i++) {
    const panel = makePanelInstance(PANEL_WIDTH, PANEL_HEIGHT);
    panels.push(panel);
    scene.add(panel);
  }
}

function setup() {
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.position.setY(PANEL_HEIGHT * 3 / 4);
  camera.lookAt(0, PANEL_HEIGHT / 2, RADIUS);
  renderer.render(scene, camera);

  scene.add(ambientLight);
  scene.add(gridHelper);

  createPanels();

  document.body.onscroll = moveCamera;
  moveCamera();
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  // controls.update();
  renderer.render(scene, camera);
}

setup();
animate();