import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { DragControls } from 'three/examples/jsm/controls/DragControls';

@Injectable({ providedIn: 'root' })
export class CanvasService {
  scene!: THREE.Scene;
  camera!: THREE.Camera;
  dragControls!: DragControls;
}
