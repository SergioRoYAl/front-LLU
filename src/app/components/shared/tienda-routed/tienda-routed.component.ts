import { Component, OnInit } from '@angular/core';
import { IProducto, IProductoPage } from '../../../model/model.interfaces';
import { ProductoAjaxService } from '../../../services/producto.ajax.service';


@Component({
  selector: 'app-tienda-routed',
  templateUrl: './tienda-routed.component.html',
  styleUrls: ['./tienda-routed.component.css']
})
export class TiendaRoutedComponent implements OnInit {

  products: IProducto[] = [];

  constructor(
    private ProductoAjaxService: ProductoAjaxService,
  ) { }

  ngOnInit() {
    this.getProductPage();
  }

  getProductPage(size: number = 10, page: number = 0, orderField: string = "nombre", orderDirection: string = "asc"): void {
    this.ProductoAjaxService.getPage(size, page, orderField, orderDirection).subscribe((data: IProductoPage) => {
      this.products = data.content;
    });
  }
}
