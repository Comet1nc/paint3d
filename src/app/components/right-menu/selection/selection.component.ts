import { Component, OnDestroy, OnInit } from '@angular/core';
import { SelectService } from '../../canvas/select.service';
import { Router } from '@angular/router';
import { Object3D, Vector2, Vector3 } from 'three';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss'],
})
export class SelectionComponent implements OnDestroy, OnInit {
  scaleX: number = 1;
  scaleY: number = 1;
  scaleZ: number = 1;

  constructor(private selectService: SelectService, private router: Router) {}
  ngOnInit(): void {
    if (!this.selectService.selectModeIsActive) {
      this.router.navigate(['']);
    }
  }
  applyScale() {
    this.selectService.selectedObject.scale.set(
      this.scaleX,
      this.scaleY,
      this.scaleZ
    );

    this.selectService.deleteSelectTool();
    this.selectService.createSelectTool();
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
}
