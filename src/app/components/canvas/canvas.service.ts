import {
  AfterViewInit,
  Component,
  ElementRef,
  Injectable,
  ViewChild,
} from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { SelectService } from './select.service';

@Injectable({ providedIn: 'root' })
export class CanvasService {
  scene = new THREE.Scene();
}
