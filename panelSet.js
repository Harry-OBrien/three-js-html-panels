import { Panel } from "./panel";
import * as THREE from 'three';

export class PanelSet {
    constructor(_options) {
        this.panels = [];
        this.container = new THREE.Object3D();
        this.radius = _options.radius;
        this.panelSpacingRads = _options.panelOffset;
        this.panelWidth = _options.panelWidth;
        this.panelHeight = _options.panelHeight;
        this.panelScale = _options.scale;
        this.radius *= this.panelScale;

        this.onScroll = this.onScroll.bind(this);

        this.panelOffset = 2 * Math.asin(this.panelWidth * this.panelScale / (2 * this.radius)) + this.panelSpacingRads;
        this.setPanels(_options.projectData);
        this.maxRotation = (this.panels.length - 1) * this.panelOffset;

        this.radialLayout(this.panels, 0);
    }

    lerp(x, y, a) {
        return (1 - a) * x + a * y
    }

    radialLayout(items, initOffset) {
        var offset = initOffset;
        items.forEach((panel, _) => {
            const x = this.radius * Math.sin(offset);
            const z = -this.radius * Math.cos(offset);

            panel.container.position.set(x, this.panelHeight * this.panelScale / 2, z);
            panel.container.rotation.set(0, -offset, 0);
            offset -= this.panelOffset;
        });
    }

    onScroll() {
        const scrollPercent = document.documentElement.scrollTop /
            (document.documentElement.scrollHeight - document.documentElement.clientHeight);

        const rotation = this.lerp(0, this.maxRotation, scrollPercent);
        this.radialLayout(this.panels, rotation);
    }

    setPanels(project_data) {
        project_data.forEach((data, idx) => {
            const panel = new Panel({
                width: this.panelWidth,
                height: this.panelHeight,
                scale: 0.25,
                colour: new THREE.Color(Math.random() * 0xffffff),
                data: data,
            });

            this.panels.push(panel);
            this.container.add(panel.container);
        });
    }
}