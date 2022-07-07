import * as THREE from 'three';
import { DoubleSide } from 'three';
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer';

export class Panel {
    constructor(_options) {
        this.width = _options.width;
        this.height = _options.height;
        this.colour = _options.colour;
        this.content = _options.data;
        this.scale = _options.scale;

        this.container = new THREE.Object3D();
        this.setPanel();
    }

    setPanel() {
        // convert the string to dome elements
        var wrapper = document.createElement('div');
        wrapper.innerHTML = this.content;
        var div = wrapper.firstChild;

        // set some values on the div to style it.
        // normally you do this directly in HTML and 
        // CSS files.
        div.style.width = this.width + 'px';
        div.style.height = this.height + 'px';
        // div.style.opacity = 0.7;
        div.style.background = this.colour.getStyle();

        const object = new CSS3DObject(div);
        object.scale.set(this.scale, this.scale, this.scale);
        this.container.add(object);
    }


}