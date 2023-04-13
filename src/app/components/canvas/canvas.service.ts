import { Injectable } from '@angular/core';
import * as THREE from 'three';

@Injectable({ providedIn: 'root' })
export class CanvasService {
  scene!: THREE.Scene;
  camera!: THREE.Camera;
}
