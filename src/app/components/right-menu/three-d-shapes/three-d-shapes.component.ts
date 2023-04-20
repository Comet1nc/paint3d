import { Component } from '@angular/core';
import { CanvasService } from '../../canvas/canvas.service';
import * as THREE from 'three';
import { DragControls } from 'three/examples/jsm/controls/DragControls';

@Component({
  selector: 'app-three-d-shapes',
  templateUrl: './three-d-shapes.component.html',
  styleUrls: ['./three-d-shapes.component.scss'],
})
export class ThreeDShapesComponent {
  title = '3D shapes';

  constructor(private canvasService: CanvasService) {}
  createCube() {
    const material = new THREE.MeshPhongMaterial({
      side: THREE.DoubleSide,
      flatShading: false,
    });

    const hue = Math.random();
    const saturation = 1;
    const luminance = 0.5;
    material.color.setHSL(hue, saturation, luminance);

    let geometry = new THREE.BoxGeometry(1, 1, 1);

    let cube = new THREE.Mesh(
      geometry,
      material
      //new THREE.MeshPhongMaterial({ color: 'red' })
    );
    cube.name = 'normal';
    this.canvasService.objectsOnScene.push(cube);
    this.canvasService.setupDragControls();
    this.canvasService.scene.add(cube);
  }
}
