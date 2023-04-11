import { Component, Inject, OnInit } from '@angular/core';
import { SelectService } from '../canvas/select.service';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss'],
})
export class ToolBarComponent implements OnInit {
  constructor(private selectService: SelectService) {}

  ngOnInit(): void {
    this.selectModeActive = this.selectService.selectModeIsActive;
    this.selectService.onSelectModeExit.subscribe(
      () => (this.selectModeActive = false)
    );
  }

  selectModeActive!: boolean;

  changeSelectMode() {
    if (!this.selectService.selectModeIsActive) {
      this.selectService.enterSelectMode();
      this.selectModeActive = true;
    } else {
      this.selectService.exitSelectMode();
      this.selectModeActive = false;
    }
  }
}
