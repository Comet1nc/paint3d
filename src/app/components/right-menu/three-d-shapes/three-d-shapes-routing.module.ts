import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThreeDShapesComponent } from './three-d-shapes.component';

const routes: Routes = [{ path: '', component: ThreeDShapesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThreeDShapesRoutingModule { }
