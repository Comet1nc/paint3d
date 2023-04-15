import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { SelectService } from './select.service';
import { CanvasService } from './canvas.service';
import { Router } from '@angular/router';
import { DragControls } from 'three/examples/jsm/controls/DragControls.js';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas') private canvasRef!: ElementRef;

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    50,
    (window.innerWidth - 300) / (window.innerHeight - 120),
    0.1,
    10000
  );
  orbitControls!: OrbitControls;

  renderer!: THREE.WebGLRenderer;

  geometry = new THREE.BoxGeometry(1, 1, 1);
  material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  cube!: THREE.Mesh;

  raycaster = new THREE.Raycaster();
  pointer = new THREE.Vector2();

  dragControls!: DragControls;

  objectsOnScene: THREE.Object3D[] = [];
  // dragStartEvent: Event;
  constructor(
    private selectService: SelectService,
    private canvasService: CanvasService
  ) {}

  ngOnInit(): void {
    this.canvasService.scene = this.scene;
  }

  ngAfterViewInit(): void {
    // Renderer Setup
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvasRef.nativeElement,
      antialias: true,
    });
    this.renderer.setSize(window.innerWidth - 300, window.innerHeight - 120);

    this.setupLighting();

    this.setupScene();

    this.setupCamera();

    this.animate();

    window.addEventListener('resize', () => {
      this.camera.aspect =
        (window.innerWidth - 300) / (window.innerHeight - 120);
      this.camera.updateProjectionMatrix();

      this.renderer.setSize(window.innerWidth - 300, window.innerHeight - 120);
    });

    this.canvasRef.nativeElement.addEventListener(
      'pointermove',
      (event: any) => {
        this.pointer.x =
          ((event.clientX - this.canvasRef.nativeElement.offsetLeft) /
            this.canvasRef.nativeElement.offsetWidth) *
            2 -
          1;
        this.pointer.y =
          -(
            (event.clientY - this.canvasRef.nativeElement.offsetTop) /
            this.canvasRef.nativeElement.offsetHeight
          ) *
            2 +
          1;
      }
    );

    this.canvasRef.nativeElement.addEventListener('mousedown', (event: any) => {
      this.raycaster.setFromCamera(this.pointer, this.camera);
      let intersects = this.raycaster.intersectObjects(this.scene.children);
      if (intersects.length < 1) {
        console.log('not found open mesh');
        return;
      }
      intersects = intersects.filter(
        (inter: THREE.Intersection<THREE.Object3D<THREE.Event>>) => {
          return inter.object.name !== 'blocked';
        }
      );
      if (intersects.length < 1) return;

      // for (let obj of intersects) {
      //   console.log(obj.object.name);
      // }
      if (intersects[0].object.name === 'blocked') return;

      if (intersects[0].object.name === 'select') {
        console.log('select founded');
        return;
      }

      // this.drawRayHelper(intersects);
      if (
        this.selectService.selectModeIsActive &&
        this.selectService.selectedObject === intersects[0].object
      ) {
        console.log('clicked on selected item');

        console.log(this.dragControls.getObjects());
        // move object
      }
      if (this.selectService.selectModeIsActive) {
        this.selectService.onItemSelected.next(intersects[0].object);
        if (this.dragControls !== undefined) {
          this.dragControls.removeEventListener;
        }
      }

      console.log('OK');
    });

    this.setupDragControls();

    // this.canvasRef.nativeElement.addEventListener('drag', (event: any) => {
    //   console.log('drag enter');
    // });

    // this.selectService.startCameraMoveInterval();
  }

  setupDragControls() {
    this.dragControls = new DragControls(
      this.objectsOnScene,
      this.camera,
      this.renderer.domElement
    );

    this.canvasService.dragControls = this.dragControls;

    this.dragControls.addEventListener('dragstart', (event: any) => {
      this.orbitControls.enabled = false;
      event.object.material.emissive.set(0xaaaaaa);
    });

    this.dragControls.addEventListener('dragend', (event: any) => {
      this.orbitControls.enabled = true;
      event.object.material.emissive.set(0x000000);
    });
  }

  setupCamera() {
    this.orbitControls = new OrbitControls(
      this.camera,
      this.canvasRef.nativeElement
    );
    this.orbitControls.zoomSpeed = 2.5;
    this.camera.position.z = 7;

    this.canvasService.camera = this.camera;

    // controls.update() must be called after any manual changes to the camera's transform
    this.orbitControls.update();
  }

  createCube() {
    let cube = new THREE.Mesh(
      this.geometry,
      this.createMaterial()
      //new THREE.MeshPhongMaterial({ color: 'red' })
    );
    cube.name = 'normal';
    let circleGeometry = new THREE.CircleGeometry(1000, 20);
    let circleMesh = new THREE.Mesh(
      circleGeometry,
      new THREE.MeshPhongMaterial({
        side: THREE.FrontSide,
        flatShading: false,
        color: 'white',
      })
    );

    return cube;
  }

  setupScene() {
    // Base cube
    this.cube = new THREE.Mesh(
      this.geometry,
      this.createMaterial()
      //new THREE.MeshPhongMaterial({ color: 'red' })
    );
    this.cube.name = 'normal';
    let circleGeometry = new THREE.CircleGeometry(1000, 20);
    let circleMesh = new THREE.Mesh(
      circleGeometry,
      new THREE.MeshPhongMaterial({
        side: THREE.FrontSide,
        flatShading: false,
        color: 'white',
        polygonOffset: true,
        polygonOffsetFactor: 1, // positive value pushes polygon further away
        polygonOffsetUnits: 1,
      })
    );

    // TEST MESHES
    let testCube1 = this.createCube();
    this.scene.add(testCube1);
    testCube1.translateX(2);
    // ============================
    circleMesh.position.y = -5;
    circleMesh.rotation.x = -Math.PI / 2;
    circleMesh.name = 'blocked';
    this.cube.setRotationFromEuler(new THREE.Euler(0, 0, 0));

    this.objectsOnScene.push(testCube1);
    this.objectsOnScene.push(this.cube);

    this.scene.add(circleMesh);
    this.scene.add(this.cube);
    this.scene.background = new THREE.Color('lightgray');
  }

  private animate() {
    requestAnimationFrame(() => this.animate());
    this.selectService.moveSelectTool();
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
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    pointLight.position.x = 2;
    pointLight.position.y = 3;
    pointLight.position.z = 4;
    this.scene.add(ambientLight, pointLight);
  }

  drawRayHelper(intersects: any) {
    var pointA = this.raycaster.ray.origin;
    var direction = this.raycaster.ray.direction;
    var distance = intersects[0].distance; // at what distance to determine pointB
    var pointB = new THREE.Vector3();
    if (direction === undefined) return;

    pointB.addVectors(pointA, direction.multiplyScalar(distance));
    var geometry = new THREE.BufferGeometry().setFromPoints([pointA, pointB]);
    var material = new THREE.LineBasicMaterial({ color: 0xff0000 });
    var line = new THREE.Line(geometry, material);
    line.name = 'blocked';
    this.scene.add(line);
  }
}
