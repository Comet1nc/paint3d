import { Component, OnDestroy, OnInit } from '@angular/core';
import { SelectService } from '../../canvas/select.service';
import { Router } from '@angular/router';
import { Object3D, Vector2, Vector3 } from 'three';
import * as THREE from 'three';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss'],
})
export class SelectionComponent implements OnDestroy, OnInit {
  scaleX: number = 1;
  scaleY: number = 1;
  scaleZ: number = 1;
  positionX: number = 1;
  positionY: number = 1;
  positionZ: number = 1;
  rotationX: number = 0;
  rotationY: number = 0;
  rotationZ: number = 0;
  inputColorValue: string = '';

  constructor(private selectService: SelectService, private router: Router) {}

  ngOnInit(): void {
    if (!this.selectService.selectModeIsActive) {
      this.router.navigate(['']);
    }

    this.selectService.onItemSelected.subscribe((item: any | undefined) => {
      if (item === undefined) return;
      this.scaleX = item.scale.x;
      this.scaleY = item.scale.y;
      this.scaleZ = item.scale.z;

      this.positionX = item.position.x;
      this.positionY = item.position.y;
      this.positionZ = item.position.z;

      this.rotationX = Math.round(THREE.MathUtils.radToDeg(item.rotation.x));
      this.rotationY = Math.round(THREE.MathUtils.radToDeg(item.rotation.y));
      this.rotationZ = Math.round(THREE.MathUtils.radToDeg(item.rotation.z));

      let r = item.material.color.r * 255;
      let g = item.material.color.g * 255;
      let b = item.material.color.b * 255;

      this.inputColorValue = this.rgbToHex(r, g, b);
    });
  }

  rgbToHex(r: any, g: any, b: any) {
    return '#' + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
  }

  componentToHex(c: any) {
    let hex = c.toString(16);
    return hex.length == 1 ? '0' + hex : hex;
  }

  applyScale() {
    this.selectService.selectedObject.scale.set(
      this.scaleX,
      this.scaleY,
      this.scaleZ
    );

    this.selectToolReboot();
  }
  ngOnDestroy(): void {
    this.selectService.exitSelectMode();
  }

  deleteObject() {
    this.selectService.deleteObject();
  }

  applyColor(el: any) {
    this.selectService.setNewColor(el.value);
  }

  applyPosition() {
    this.selectService.selectedObject.position.set(
      this.positionX,
      this.positionY,
      this.positionZ
    );

    this.selectToolReboot();
  }

  selectToolReboot() {
    this.selectService.deleteSelectTool();
    this.selectService.createSelectTool();
  }

  applyRotation() {
    // setInterval(() => {
    //   console.log(this.selectService.selectedObject.rotation);
    // }, 1000);
    // let a = new THREE.Object3D();
    // a.rotation.set();
    this.selectService.selectedObject.rotation.set(
      THREE.MathUtils.degToRad(this.rotationX),
      THREE.MathUtils.degToRad(this.rotationY),
      THREE.MathUtils.degToRad(this.rotationZ)
    );
  }
}
