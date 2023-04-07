import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThreeDShapesRoutingModule } from './three-d-shapes-routing.module';
import { ThreeDShapesComponent } from './three-d-shapes.component';


@NgModule({
  declarations: [
    ThreeDShapesComponent
  ],
  imports: [
    CommonModule,
    ThreeDShapesRoutingModule
  ]
})
export class ThreeDShapesModule { }
