import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThreeDShapesRoutingModule } from './three-d-shapes-routing.module';
import { ThreeDShapesComponent } from './three-d-shapes.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ThreeDShapesComponent],
  imports: [CommonModule, FormsModule, ThreeDShapesRoutingModule],
})
export class ThreeDShapesModule {}
