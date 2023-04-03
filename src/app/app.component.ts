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

  renderer = new THREE.WebGLRenderer();

  geometry = new THREE.BoxGeometry(1, 1, 1);
  material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  cube = new THREE.Mesh(this.geometry, this.material);

  // rotationSpeedX = 0.05;
  // rotationSpeedY = 0.05;
  // cubeSize = 200;
  // cameraZ = 400;
  // fieldOfView = 1;
  // nearClippingPlane = 1;
  // farClippingPlane = 1000;
  // camera!: THREE.PerspectiveCamera;
  // get canvas(): HTMLCanvasElement {
  //   return this.canvasRef.nativeElement;
  // }
  // loader = new THREE.TextureLoader();
  // geometry = new THREE.BoxGeometry(1, 1, 1);
  // material = new THREE.MeshBasicMaterial({ color: 'green' });

  // cube = new THREE.Mesh(this.geometry, this.material);
  // renderer!: THREE.WebGLRenderer;
  // scene!: THREE.Scene;
  ngAfterViewInit(): void {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
    this.scene.add(this.cube);

    this.camera.position.z = 5;
    this.cube.rotation.x += 0.5;

    setInterval(() => {
      requestAnimationFrame(this.animate);
      this.cube.rotation.y += 0.02;
      this.renderer.render(this.scene, this.camera);
    }, 10);
    this.animate();
    // this.createScene();
    // this.startRenderingLoop();
  }

  animate() {
    requestAnimationFrame(this.animate);
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;
    this.renderer.render(this.scene, this.camera);
  }

  // createScene() {
  //   // Scene
  //   this.scene = new THREE.Scene();
  //   this.scene.background = new THREE.Color(0x000000);
  //   this.scene.add(this.cube);

  //   // Camera
  //   let aspectRatio = this.getAspectRatio();
  //   this.camera = new THREE.PerspectiveCamera(
  //     this.fieldOfView,
  //     aspectRatio,
  //     this.nearClippingPlane,
  //     this.farClippingPlane
  //   );
  // }

  // getAspectRatio() {
  //   return this.canvas.clientWidth / this.canvas.clientHeight;
  // }

  // animateCube() {
  //   this.cube.rotation.x += this.rotationSpeedX;
  //   this.cube.rotation.y += this.rotationSpeedY;
  // }

  // startRenderingLoop() {
  //   this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
  //   this.renderer.setPixelRatio(devicePixelRatio);
  //   this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientWidth);

  //   let component: AppComponent = this;
  //   (function render() {
  //     requestAnimationFrame(render);
  //     component.animateCube();
  //     component.renderer.render(component.scene, component.camera);
  //   });
  // }
}
