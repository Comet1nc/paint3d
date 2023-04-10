import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import * as THREE from 'three';
import { CanvasService } from './canvas.service';

@Injectable({ providedIn: 'root' })
export class SelectService {
  selectModeIsActive: boolean = true;
  selectModeEnter = new Subject<void>();
  selectModeExit = new Subject<void>();

  onItemSelected = new Subject<THREE.Object3D>();
  selectedItem!: THREE.Object3D;
  currentSelectTool!: THREE.LineSegments;

  constructor(private canvasService: CanvasService) {
    this.onItemSelected.subscribe((item: THREE.Object3D) => {
      this.selectedItem = item;
      if (this.currentSelectTool !== undefined) {
        this.canvasService.scene.remove(this.currentSelectTool);
      }
      this.createSelectTool();
    });
  }

  createSelectTool() {
    let boundingBox = new THREE.Box3().setFromObject(this.selectedItem);

    let size = boundingBox.getSize(new THREE.Vector3());
    const widthSegments = 2;
    const heightSegments = 2;
    let planeGeometry = new THREE.PlaneGeometry(
      size.x * 1.5,
      size.y * 1.5,
      widthSegments,
      heightSegments
    );

    let geometry = new THREE.EdgesGeometry(planeGeometry);
    this.currentSelectTool = new THREE.LineSegments(
      geometry,
      new THREE.LineBasicMaterial({
        color: 0xffffff,
        polygonOffset: true,
        polygonOffsetFactor: 2, // positive value pushes polygon further away
        polygonOffsetUnits: 2,
      })
    );
    this.currentSelectTool.name = 'blocked';

    this.canvasService.scene.add(this.currentSelectTool);

    this.currentSelectTool.position.set(
      this.selectedItem.position.x,
      this.selectedItem.position.y,
      this.selectedItem.position.z
    );
  }

  enterSelectMode() {
    this.selectModeEnter.next();
    this.selectModeIsActive = true;
  }

  exitSelectMode() {
    this.selectModeExit.next();
    this.selectModeIsActive = false;
  }

  select(item: any) {}
}
