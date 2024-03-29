import './style.scss'

import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer';
import { PanelSet } from './panelSet';
import { Panel } from './panel';

let scene, camera, renderer;
let scene2, renderer2;
let controls;

const PANEL_WIDTH = 370;
const PANEL_HEIGHT = 370;
const RADIUS = 1000;
const SCALE = 0.25
init();
animate();

function init() {
  // Scene
  scene = new THREE.Scene();
  const gridHelper = new THREE.GridHelper(500, 50);
  scene.add(gridHelper);

  scene2 = new THREE.Scene();

  // Camera
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);
  camera.position.set(0, PANEL_HEIGHT * SCALE, 64);
  camera.lookAt(0, 0, -RADIUS * SCALE);
  // camera.position.setY(PANEL_HEIGHT * 3 / 4);
  // camera.lookAt(0, PANEL_HEIGHT / 2, RADIUS);

  // Rendering
  renderer = new THREE.WebGLRenderer({
    // canvas: document.querySelector('#bg'),
    antialias: true,
    alpha: true,
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById("webgl-canvas").appendChild(renderer.domElement);

  renderer2 = new CSS3DRenderer({
    alpha: true
  });
  renderer2.setSize(window.innerWidth, window.innerHeight);
  renderer2.domElement.style.position = 'absolute';
  renderer2.domElement.style.top = 0;
  document.getElementById("css3d-canvas").appendChild(renderer2.domElement);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff);
  scene.add(ambientLight);

  // Temp Panels;
  // controls = new OrbitControls(camera, renderer2.domElement);

  // Panels
  const panelSet = new PanelSet({
    radius: RADIUS,
    panelOffset: Math.PI / 32,
    panelWidth: PANEL_WIDTH,
    panelHeight: PANEL_HEIGHT,
    scale: SCALE,
    projectData: [
      '<div>' +
      '<h1>Project 1</h1>' +
      '<textarea>And this is a textarea</textarea>' +
      '</div>',

      '<div>' +
      '<h1>Project 2</h1>' +
      '<textarea>And this is a textarea</textarea>' +
      '</div>',

      '<div>' +
      '<h1>Project 3</h1>' +
      '<textarea>And this is a textarea</textarea>' +
      '</div>',

      '<div>' +
      '<h1>Project 4</h1>' +
      '<textarea>And this is a textarea</textarea>' +
      '</div>',

      '<div>' +
      '<h1>Project 5</h1>' +
      '<textarea>And this is a textarea</textarea>' +
      '</div>',

      '<div>' +
      '<h1>Project 6</h1>' +
      '<textarea>And this is a textarea</textarea>' +
      '</div>',

      '<div>' +
      '<h1>Project 7</h1>' +
      '<textarea>And this is a textarea</textarea>' +
      '</div>',

      '<div>' +
      '<h1>Project 8</h1>' +
      '<textarea>And this is a textarea</textarea>' +
      '</div>',

      '<div>' +
      '<h1>Project 9</h1>' +
      '<textarea>And this is a textarea</textarea>' +
      '</div>',
    ],
  });
  scene2.add(panelSet.container);
  document.body.onscroll = panelSet.onScroll;
  panelSet.onScroll();
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);

  // controls.update();

  renderer.render(scene, camera);
  renderer2.render(scene2, camera);
}

