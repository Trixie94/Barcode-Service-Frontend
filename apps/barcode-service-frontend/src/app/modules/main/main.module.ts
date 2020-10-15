import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { MaterialModule } from '@app/shared/material.module';
import { MainViewComponent } from './main-view/main-view.component';
import { MainViewEncryptComponent } from './main-view/main-view-encrypt/main-view-encrypt.component';
import { MainViewDecryptComponent } from './main-view/main-view-decrypt/main-view-decrypt.component';

@NgModule({
  imports: [CommonModule, MainRoutingModule, SharedModule],
  declarations: [MainComponent, MainViewComponent, MainViewEncryptComponent, MainViewDecryptComponent],
})
export class MainModule {}
