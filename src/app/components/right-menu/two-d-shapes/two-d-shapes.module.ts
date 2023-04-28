import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TwoDShapesRoutingModule } from './two-d-shapes-routing.module';
import { TwoDShapesComponent } from './two-d-shapes.component';


@NgModule({
  declarations: [
    TwoDShapesComponent
  ],
  imports: [
    CommonModule,
    TwoDShapesRoutingModule
  ]
})
export class TwoDShapesModule { }
