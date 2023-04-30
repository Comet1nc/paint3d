import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TwoDShapesRoutingModule } from './two-d-shapes-routing.module';
import { TwoDShapesComponent } from './two-d-shapes.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [TwoDShapesComponent],
  imports: [CommonModule, FormsModule, TwoDShapesRoutingModule],
})
export class TwoDShapesModule {}
