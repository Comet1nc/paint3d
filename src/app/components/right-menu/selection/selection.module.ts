import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SelectionRoutingModule } from './selection-routing.module';
import { SelectionComponent } from './selection.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [SelectionComponent],
  imports: [CommonModule, SelectionRoutingModule, FormsModule],
})
export class SelectionModule {}
