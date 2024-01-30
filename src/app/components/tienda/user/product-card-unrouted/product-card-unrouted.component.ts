import { Component, Input, OnInit } from '@angular/core';
import { IProducto } from '../../../../model/model.interfaces';

@Component({
  selector: 'app-product-card-unrouted',
  templateUrl: './product-card-unrouted.component.html',
  styleUrls: ['./product-card-unrouted.component.css']
})
export class ProductCardUnroutedComponent implements OnInit {

  @Input() product!: IProducto;

  constructor() { }

  ngOnInit() {
  }

}
