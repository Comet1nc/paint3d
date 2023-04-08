import { Component, Inject } from '@angular/core';
import { SelectService } from '../canvas/select.service';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss'],
})
export class ToolBarComponent {
  constructor(private selectService: SelectService) {}

  selectModeActive = false;

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
