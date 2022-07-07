import './style.scss'

import * as THREE from 'three';
import { DoubleSide } from 'three';
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new CSS3DRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('bg').appendChild(renderer.domElement);

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

const PROJECTS = [
  'H', 'Hydrogen', '1.00794', 1, 1,
  'He', 'Helium', '4.002602', 18, 1,
  'Li', 'Lithium', '6.941', 1, 2,
  'Be', 'Beryllium', '9.012182', 2, 2,
  'B', 'Boron', '10.811', 13, 2,
  'C', 'Carbon', '12.0107', 14, 2,
  'N', 'Nitrogen', '14.0067', 15, 2,
  'O', 'Oxygen', '15.9994', 16, 2,
];

const NUM_PANELS = PROJECTS.length / 5;
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
    side: DoubleSide,
  });


  // let el = document.createElement("div");
  // el.innerHTML = "<h1>Hello world!</h1>";
  // let obj = new CSS3DObject(el);

  // return obj;

  var panel = new THREE.Mesh(geometry, material);
  return panel;
}

function lerp(x, y, a) {
  return (1 - a) * x + a * y
}

function pageDidScroll() {
  const scrollPercent = document.documentElement.scrollTop /
    (document.documentElement.scrollHeight - document.documentElement.clientHeight);

  const rotation = lerp(0, MAX_ROTATION, scrollPercent);
  radialLayout(panels, rotation);
}

function radialLayout(items, initOffset) {
  var offset = initOffset;
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
  // renderer.setPixelRatio(window.devicePixelRatio);
  // renderer.setSize(window.innerWidth, window.innerHeight);

  camera.position.setY(PANEL_HEIGHT * 3 / 4);
  camera.lookAt(0, PANEL_HEIGHT / 2, RADIUS);
  // renderer.render(scene, camera);

  scene.add(ambientLight);
  scene.add(gridHelper);

  createPanels();

  document.body.onscroll = pageDidScroll;
  pageDidScroll();
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

setup();
animate();