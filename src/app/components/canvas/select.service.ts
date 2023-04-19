import { AfterContentInit, AfterViewInit, Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import * as THREE from 'three';
import { CanvasService } from './canvas.service';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class SelectService {
  selectModeIsActive: boolean = false;
  onSelectModeEnter = new Subject<void>();
  onSelectModeExit = new Subject<void>();

  onItemSelected = new BehaviorSubject<THREE.Object3D | undefined>(undefined);
  selectedObject!: any;
  currentSelectTool!: THREE.LineSegments;
  lastCameraPos!: THREE.Vector3;

  constructor(private canvasService: CanvasService, private router: Router) {
    this.onItemSelected.subscribe((item: THREE.Object3D | undefined) => {
      if (item === undefined) return;

      this.selectedObject = item;
      this.deleteSelectTool();
      this.createSelectTool();
      this.router.navigate(['selection']);
    });
  }

  deleteSelectTool() {
    if (this.currentSelectTool !== undefined) {
      this.canvasService.scene.remove(this.currentSelectTool);
    }
  }

  animateSelectTool() {
    if (!this.selectModeIsActive || this.currentSelectTool === undefined)
      return;

    this.currentSelectTool.lookAt(this.canvasService.camera.position);
    this.currentSelectTool.position.set(
      this.selectedObject.position.x,
      this.selectedObject.position.y,
      this.selectedObject.position.z
    );
    let scaleX: number;

    if (this.selectedObject.scale.z > this.selectedObject.scale.x) {
      scaleX = this.selectedObject.scale.z;
    } else {
      scaleX = this.selectedObject.scale.x;
    }
  }

  createSelectTool() {
    let boundingBox = new THREE.Box3().setFromObject(this.selectedObject);
    let size = boundingBox.getSize(new THREE.Vector3());

    let sizeX: number;

    if (size.z > size.x) {
      sizeX = size.z;
    } else {
      sizeX = size.x;
    }
    const widthSegments = 2;
    const heightSegments = 2;
    let planeGeometry = new THREE.PlaneGeometry(
      sizeX * 1.5,
      size.y * 1.5,
      widthSegments,
      heightSegments
    );

    let geometry = new THREE.EdgesGeometry(planeGeometry);
    this.currentSelectTool = new THREE.LineSegments(
      geometry,
      new THREE.LineBasicMaterial({
        color: '#787878',
        polygonOffset: true,
        polygonOffsetFactor: 2, // positive value pushes polygon further away
        polygonOffsetUnits: 2,
      })
    );
    this.currentSelectTool.name = 'select';

    this.canvasService.scene.add(this.currentSelectTool);

    this.currentSelectTool.position.set(
      this.selectedObject.position.x,
      this.selectedObject.position.y,
      this.selectedObject.position.z
    );

    // this.canvasService.camera.position.
    // this.canvasService.camera.addEventListener('onmove', () => {
    //   this.currentSelectTool.lookAt(this.canvasService.camera.position);
    // });

    // ==================================
    // some  btn
    // var loader = new THREE.TextureLoader();

    // // Load an image file into a custom material
    // var material = new THREE.MeshLambertMaterial({
    //   map: loader.load('assets/close2.jpg'),
    //   side: THREE.DoubleSide,
    //   color: 'white',
    // });

    // // create a plane geometry for the image with a width of 10
    // // and a height that preserves the image's aspect ratio
    // var closeGeometry = new THREE.PlaneGeometry(10, 10);

    // // combine our image geometry and material into a mesh
    // var mesh = new THREE.Mesh(closeGeometry, material);

    // // set the position of the image mesh in the x,y,z dimensions
    // mesh.position.set(0, 5, 0);

    // // add the image to the scene
    // this.canvasService.scene.add(mesh);
  }

  enterSelectMode() {
    this.onSelectModeEnter.next();
    this.selectModeIsActive = true;
  }

  exitSelectMode() {
    this.onSelectModeExit.next();
    this.selectModeIsActive = false;
    this.canvasService.scene.remove(this.currentSelectTool);
    this.router.navigate(['']);

    // this.selectedItem = new THREE.Object3D();
  }

  select(item: any) {}

  deleteObject() {
    this.canvasService.scene.remove(this.currentSelectTool);
    this.canvasService.scene.remove(this.selectedObject);
    this.router.navigate(['']);
  }

  setNewColor(color: string) {
    this.selectedObject?.material.color.set(color);
  }
}
