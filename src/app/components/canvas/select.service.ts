import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SelectService {
  selectModeIsActive: boolean = false;
  selectModeEnter = new Subject<void>();
  selectModeExit = new Subject<void>();

  itemSelected = new Subject<any>();

  enterSelectMode() {
    this.selectModeEnter.next();
    this.selectModeIsActive = true;
  }

  exitSelectMode() {
    this.selectModeExit.next();
    this.selectModeIsActive = false;
  }

  select(item: any) {}
}
