import { Component, OnInit } from '@angular/core';
import { IProducto, IProductoPage, PaginatorState } from '../../../model/model.interfaces';
import { ProductoAjaxService } from '../../../services/producto.ajax.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-tienda-routed',
  templateUrl: './tienda-routed.component.html',
  styleUrls: ['./tienda-routed.component.css']
})
export class TiendaRoutedComponent implements OnInit {

  products: IProducto[] = [];
  oPage: IProductoPage | undefined;
  orderField: string = "id";
  orderDirection: string = "asc";
  oPaginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0 };
  status: HttpErrorResponse | null = null;

  constructor(
    private productoAjaxService: ProductoAjaxService,
  ) { }

  ngOnInit() {
    this.getProductPage();
  }

  getProductPage(): void {
    this.productoAjaxService.getPage(
      this.oPaginatorState.rows,
      this.oPaginatorState.page,
      this.orderField,
      this.orderDirection
    ).subscribe({
      next: (data: IProductoPage) => {
        this.oPage = data;
        this.products = data.content; // Actualiza la lista de productos
        this.oPaginatorState.pageCount = data.totalPages;
      },
      error:(error: HttpErrorResponse) => {
        this.status = error;
      }
    });
  }

  onPageChange(event: PaginatorState) {
    this.oPaginatorState.rows = event.rows;
    this.oPaginatorState.page = event.page; // Actualiza el primer índice
    this.getProductPage();
  }
}
