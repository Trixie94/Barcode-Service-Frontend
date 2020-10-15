import { NgModule } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatOptionModule } from '@angular/material/core';

@NgModule({
  imports: [MatFormFieldModule, MatSelectModule, MatCardModule, MatIconModule, MatOptionModule],
  exports: [MatFormFieldModule, MatSelectModule, MatCardModule, MatIconModule, MatOptionModule],
})
export class MaterialModule {}
