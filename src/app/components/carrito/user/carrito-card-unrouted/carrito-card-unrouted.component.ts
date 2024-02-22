import { Component, Input, OnInit } from '@angular/core';
import { IDetallePedido, IProducto } from '../../../../model/model.interfaces';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProductViewUnroutedComponent } from '../../../tienda/user/product-view-unrouted/product-view-unrouted.component';
import { API_URL } from '../../../../../environment/environment';

@Component({
  selector: 'app-carrito-card-unrouted',
  templateUrl: './carrito-card-unrouted.component.html',
  styleUrls: ['./carrito-card-unrouted.component.css']
})
export class CarritoCardUnroutedComponent implements OnInit {

  @Input() detallepedido: IDetallePedido = {} as IDetallePedido;
  imageSrc: string = '';
  ref: DynamicDialogRef | undefined;

  constructor(
    private oDialogService: DialogService
  ) { }

  ngOnInit() {
    this.imageSrc = API_URL + "/media/" + this.detallepedido.producto.foto;
  }

  doView(p: IProducto) {
    this.ref = this.oDialogService.open(ProductViewUnroutedComponent, {
      data: {
        id: p.id
      },
      header: p.nombre,
      width: "50%",
      contentStyle: { overflow: "auto"},
      baseZIndex: 10000,
      maximizable: false
    });
  }

}
