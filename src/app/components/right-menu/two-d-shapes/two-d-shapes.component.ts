import { Component } from '@angular/core';
import * as THREE from 'three';
import { CanvasService } from '../../canvas/canvas.service';

@Component({
  selector: 'app-two-d-shapes',
  templateUrl: './two-d-shapes.component.html',
  styleUrls: ['./two-d-shapes.component.scss'],
})
export class TwoDShapesComponent {
  title = '2D shapes';
  inputColorValue: string = '#00000';

  constructor(private canvasService: CanvasService) {}

  createPlane() {
    let geometry = new THREE.PlaneGeometry(1, 1, 1);

    let plane = new THREE.Mesh(geometry, this.getNewMaterial());
    plane.name = 'normal';

    this.canvasService.addNewObjectToScene(plane);
  }

  createCircle() {
    let geometry = new THREE.CircleGeometry(1, 30, 30);

    let circle = new THREE.Mesh(geometry, this.getNewMaterial());
    circle.name = 'normal';

    this.canvasService.addNewObjectToScene(circle);
  }

  createTriangle() {
    const shape = new THREE.Shape();
    const x = 0;
    const y = 0;

    shape.moveTo(x - 2, y - 2);
    shape.lineTo(x + 2, y - 2);
    shape.lineTo(x, y + 10);

    let geometry = new THREE.ShapeGeometry(shape);

    let triangle = new THREE.Mesh(geometry, this.getNewMaterial());
    triangle.name = 'normal';

    this.canvasService.addNewObjectToScene(triangle);
  }

  //not done
  createCylinder() {
    let geometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);

    let cylinder = new THREE.Mesh(geometry, this.getNewMaterial());
    cylinder.name = 'normal';

    this.canvasService.addNewObjectToScene(cylinder);
  }

  //not done
  createDoughnut() {
    let geometry = new THREE.TorusGeometry(1, 0.5, 30, 64);

    let doughnut = new THREE.Mesh(geometry, this.getNewMaterial());
    doughnut.name = 'normal';

    this.canvasService.addNewObjectToScene(doughnut);
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
