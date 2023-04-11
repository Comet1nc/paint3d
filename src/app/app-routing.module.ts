import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'three-d-shapes',
    pathMatch: 'full',
  },
  {
    path: 'three-d-shapes',
    loadChildren: () =>
      import(
        './components/right-menu/three-d-shapes/three-d-shapes.module'
      ).then((m) => m.ThreeDShapesModule),
  },
  {
    path: 'selection',
    loadChildren: () =>
      import('./components/right-menu/selection/selection.module').then(
        (m) => m.SelectionModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
