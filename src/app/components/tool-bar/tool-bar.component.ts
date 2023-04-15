import { Component, Inject, OnInit } from '@angular/core';
import { SelectService } from '../canvas/select.service';
import { CanvasService } from '../canvas/canvas.service';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss'],
})
export class ToolBarComponent implements OnInit {
  constructor(
    private selectService: SelectService,
    private canvasService: CanvasService
  ) {}

  ngOnInit(): void {
    this.selectModeActive = this.selectService.selectModeIsActive;
    this.selectService.onSelectModeExit.subscribe(
      () => (this.selectModeActive = false)
    );
  }

  selectModeActive!: boolean;
  moveModeActive: boolean = true;

  toggleMoveMode() {
    if (this.moveModeActive) {
      this.moveModeActive = false;
      this.canvasService.dragControls.enabled = this.moveModeActive;
    } else {
      this.moveModeActive = true;
      this.canvasService.dragControls.enabled = this.moveModeActive;
    }
  }

  toggleSelectMode() {
    if (!this.selectService.selectModeIsActive) {
      this.selectService.enterSelectMode();
      this.selectModeActive = true;
    } else {
      this.selectService.exitSelectMode();
      this.selectModeActive = false;
    }
  }
}
