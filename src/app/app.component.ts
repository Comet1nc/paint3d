import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild('canvas') private canvasRef!: ElementRef;

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  renderer!: THREE.WebGLRenderer;

  geometry = new THREE.BoxGeometry(1, 1, 1);
  material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  cube = new THREE.Mesh(this.geometry, this.material);

  ngAfterViewInit(): void {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvasRef.nativeElement,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.scene.add(this.cube);

    this.camera.position.z = 5;
    this.cube.rotation.x += 0.5;

    setInterval(() => {
      this.cube.rotation.y += 0.02;
      this.renderer.render(this.scene, this.camera);
    }, 10);
  }
}
