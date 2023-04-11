import { Component, OnDestroy, OnInit } from '@angular/core';
import { SelectService } from '../../canvas/select.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss'],
})
export class SelectionComponent implements OnDestroy, OnInit {
  constructor(private selectService: SelectService, private router: Router) {}
  ngOnInit(): void {
    if (!this.selectService.selectModeIsActive) {
      this.router.navigate(['']);
    }
  }
  ngOnDestroy(): void {
    this.selectService.exitSelectMode();
  }

  deleteObject() {
    this.selectService.deleteObject();
  }
}
