import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { DragControls } from 'three/examples/jsm/controls/DragControls';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

@Injectable({ providedIn: 'root' })
export class CanvasService {
  scene!: THREE.Scene;
  renderer!: THREE.WebGLRenderer;
  camera!: THREE.Camera;
  dragControls!: DragControls;
  objectsOnScene: THREE.Object3D[] = [];
  orbitControls!: OrbitControls;

  setupDragControls() {
    this.dragControls = new DragControls(
      this.objectsOnScene,
      this.camera,
      this.renderer.domElement
    );

    this.dragControls = this.dragControls;

    this.dragControls.addEventListener('dragstart', (event: any) => {
      this.orbitControls.enabled = false;
      event.object.material.emissive.set(0xaaaaaa);
    });

    this.dragControls.addEventListener('dragend', (event: any) => {
      this.orbitControls.enabled = true;
      event.object.material.emissive.set(0x000000);
    });

    this.dragControls.enabled = false;
  }

  addNewObjectToScene(obj: THREE.Object3D) {
    this.objectsOnScene.push(obj);
    this.setupDragControls();
    this.scene.add(obj);
  }
}
