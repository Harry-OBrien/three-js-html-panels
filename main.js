import './style.scss'

import * as THREE from 'three';
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer';
import { PanelSet } from './panelSet';

var scene, camera, renderer;
const PANEL_WIDTH = 12;
const PANEL_HEIGHT = 16;
const RADIUS = 40;

init();
animate();

function init() {
  scene = new THREE.Scene();

  // Camera
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.setY(PANEL_HEIGHT * 3 / 4);
  camera.lookAt(0, PANEL_HEIGHT / 2, RADIUS);

  // Rendering
  renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
  });

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff);
  scene.add(ambientLight);

  // Panels
  const panelSet = new PanelSet({
    radius: RADIUS,
    panelOffset: Math.PI / 32,
    panelWidth: PANEL_WIDTH,
    panelHeight: PANEL_HEIGHT,
    projectData: [1, 2, 3],
  });
  scene.add(panelSet.container);
  document.body.onscroll = panelSet.onScroll;
  panelSet.onScroll();
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}