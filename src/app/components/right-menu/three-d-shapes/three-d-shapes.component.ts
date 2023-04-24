import { Component } from '@angular/core';
import { CanvasService } from '../../canvas/canvas.service';
import * as THREE from 'three';

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
    let geometry = new THREE.BoxGeometry(1, 1, 1);

    let cube = new THREE.Mesh(geometry, this.getNewMaterial());
    cube.name = 'normal';

    this.canvasService.addNewObjectToScene(cube);
  }

  createSphere() {
    let geometry = new THREE.SphereGeometry(1, 30, 30);

    let sphere = new THREE.Mesh(geometry, this.getNewMaterial());
    sphere.name = 'normal';

    this.canvasService.addNewObjectToScene(sphere);
  }
  createCone() {
    let geometry = new THREE.ConeGeometry(0.5, 2, 32);

    let cone = new THREE.Mesh(geometry, this.getNewMaterial());
    cone.name = 'normal';

    this.canvasService.addNewObjectToScene(cone);
  }

  createPyramid() {
    let geometry = new THREE.ConeGeometry(0.5, 2, 4);

    let pyramid = new THREE.Mesh(geometry, this.getNewMaterial());
    pyramid.name = 'normal';

    this.canvasService.addNewObjectToScene(pyramid);
  }

  getNewMaterial() {
    const material = new THREE.MeshPhongMaterial({
      side: THREE.DoubleSide,
      flatShading: false,
    });

    material.color.set(this.inputColorValue as THREE.HexColorString);

    return material;
  }
}
