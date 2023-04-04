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

  mouseDown = false;
  mouseX = 0;
  mouseY = 0;

  ngAfterViewInit(): void {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvasRef.nativeElement,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.scene.add(this.cube);

    this.camera.position.z = 5;
    this.cube.rotation.x += 0.5;

    // setInterval(() => {
    //   this.cube.rotation.y += 0.02;
    //   this.renderer.render(this.scene, this.camera);
    // }, 10);

    this.canvasRef.nativeElement.addEventListener('mousedown', (event: any) => {
      this.mouseDown = true;
      this.mouseX = event.clientX;
      this.mouseY = event.clientY;
    });

    this.canvasRef.nativeElement.addEventListener('mouseup', () => {
      this.mouseDown = false;
    });

    this.canvasRef.nativeElement.addEventListener('mousemove', (event: any) => {
      if (!this.mouseDown) {
        return;
      }

      const deltaX = event.clientX - this.mouseX;
      const deltaY = event.clientY - this.mouseY;

      // Rotate camera
      const rotationSpeed = 0.01;
      this.camera.rotation.y -= deltaX * rotationSpeed;
      this.camera.rotation.x -= deltaY * rotationSpeed;

      this.mouseX = event.clientX;
      this.mouseY = event.clientY;
    });

    this.canvasRef.nativeElement.addEventListener('wheel', (event: any) => {
      // Zoom camera
      const zoomSpeed = 0.1;
      this.camera.position.z += event.deltaY * zoomSpeed;
    });

    this.animate();
  }

  private animate() {
    requestAnimationFrame(() => this.animate());
    this.cube.rotation.y += 0.02;
    this.renderer.render(this.scene, this.camera);
  }
}
