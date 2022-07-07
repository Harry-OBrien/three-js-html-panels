import * as THREE from 'three';
import { DoubleSide } from 'three';

export class Panel {
    constructor(_options) {
        this.width = _options.width;
        this.height = _options.height;
        this.colour = _options.colour;
        this.content = _options.data;

        this.container = new THREE.Object3D();
        this.setPanel();
    }

    setPanel() {
        const geometry = new THREE.PlaneGeometry(this.width, this.height);
        const material = new THREE.MeshStandardMaterial({
            color: this.colour,
            side: DoubleSide,
        });

        // var content = '<div>' +
        //     '<h1>This is an H1 Element.</h1>' +
        //     '<span class="large">Hello Three.js cookbook</span>' +
        //     '<textarea> And this is a textarea</textarea>' +
        //     '</div>';

        // var cssElement = createCSS3DObject(content);
        // cssElement.position.set(100, 100, 100);
        // return cssElement;
        // scene.add(cssElement);

        // let el = document.createElement("div");
        // el.innerHTML = "<h1>Hello world!</h1>";
        // let obj = new CSS3DObject(el);

        // return obj;

        var panel = new THREE.Mesh(geometry, material);
        this.container.add(panel);
    }


}