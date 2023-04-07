import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '*',
    redirectTo: 'three-d-shapes',
  },
  {
    path: 'three-d-shapes',
    loadChildren: () =>
      import(
        './components/right-menu/three-d-shapes/three-d-shapes.module'
      ).then((m) => m.ThreeDShapesModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
