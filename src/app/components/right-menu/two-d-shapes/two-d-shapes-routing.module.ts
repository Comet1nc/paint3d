import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TwoDShapesComponent } from './two-d-shapes.component';

const routes: Routes = [{ path: '', component: TwoDShapesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TwoDShapesRoutingModule { }
