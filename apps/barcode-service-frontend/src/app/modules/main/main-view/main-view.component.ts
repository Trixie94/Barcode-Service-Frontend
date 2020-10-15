import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'barcode-service-frontend-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss'],
})
export class MainViewComponent implements OnInit {
  typeCrypt = 'encrypt';
  barcodeType;

  constructor() {}

  ngOnInit() {}
}
