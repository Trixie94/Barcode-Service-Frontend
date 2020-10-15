import { NgModule } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [MatFormFieldModule, MatSelectModule, MatCardModule, MatIconModule],
  exports: [MatFormFieldModule, MatSelectModule, MatCardModule, MatIconModule],
})
export class MaterialModule {}
