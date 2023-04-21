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
  inputColorValue: string = '#00000';

  constructor(private canvasService: CanvasService) {}
  createCube() {
    const material = new THREE.MeshPhongMaterial({
      side: THREE.DoubleSide,
      flatShading: false,
    });

    material.color.set(this.inputColorValue as THREE.HexColorString);

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
  // applyColor(el: any) {
  //   this.selectService.setNewColor(el.value);
  // }
  hexToRgb(hex: any) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  }
}
