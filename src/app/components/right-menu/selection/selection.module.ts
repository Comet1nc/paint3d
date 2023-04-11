import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SelectionRoutingModule } from './selection-routing.module';
import { SelectionComponent } from './selection.component';

@NgModule({
  declarations: [SelectionComponent],
  imports: [CommonModule, SelectionRoutingModule],
})
export class SelectionModule {}
