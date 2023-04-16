import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  imports: [MatIconModule, MatButtonModule, MatFormFieldModule],
  exports: [MatIconModule, MatButtonModule, MatFormFieldModule],
})
export class AngularMaterialModule {}
