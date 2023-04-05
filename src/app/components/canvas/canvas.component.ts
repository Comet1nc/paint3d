import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent implements AfterViewInit {
  @ViewChild('canvas') private canvasRef!: ElementRef;

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  controls!: OrbitControls;

  renderer!: THREE.WebGLRenderer;

  geometry = new THREE.BoxGeometry(1, 1, 1);
  material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  cube!: THREE.Mesh;

  mouseDown = false;
  rightMouseDown = false;
  mouseX = 0;
  mouseY = 0;
  zoomSpeed = 0.005;

  ngAfterViewInit(): void {
    // Renderer Setup
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvasRef.nativeElement,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.setupLighting();

    // Base cube
    this.cube = new THREE.Mesh(
      this.geometry,
      this.createMaterial()
      //new THREE.MeshPhongMaterial({ color: 'red' })
    );

    // Plane
    let planeGeometry = new THREE.PlaneGeometry(100, 100);
    let plane = new THREE.Mesh(
      planeGeometry,
      new THREE.MeshPhongMaterial({
        side: THREE.FrontSide,
        flatShading: false,
        color: 'white',
      })
    );
    plane.position.z = 50;
    plane.rotateX(-90);
    this.cube.setRotationFromEuler(new THREE.Euler(0, 0, 0));
    this.scene.add(plane);
    this.scene.add(this.cube);
    this.scene.background = new THREE.Color('lightgray');

    // Camera controls
    this.controls = new OrbitControls(
      this.camera,
      this.canvasRef.nativeElement
    );
    this.controls.zoomSpeed = 2.5;
    this.camera.position.z = 5;

    // controls.update() must be called after any manual changes to the camera's transform
    this.controls.update();

    this.animate();
  }

  private animate() {
    requestAnimationFrame(() => this.animate());
    // this.cube.rotation.y += 0.02;
    this.renderer.render(this.scene, this.camera);
  }

  createMaterial() {
    const material = new THREE.MeshPhongMaterial({
      side: THREE.DoubleSide,
      flatShading: false,
    });

    const hue = Math.random();
    const saturation = 1;
    const luminance = 0.5;
    material.color.setHSL(hue, saturation, luminance);

    return material;
  }

  setupLighting() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    pointLight.position.x = 2;
    pointLight.position.y = 3;
    pointLight.position.z = 4;
    this.scene.add(ambientLight, pointLight);
  }
}
