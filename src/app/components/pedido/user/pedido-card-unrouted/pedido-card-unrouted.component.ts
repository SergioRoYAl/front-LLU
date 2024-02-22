import { Component, Input, OnInit } from '@angular/core';
import { IDetallePedido, IDetallePedidoPage, IDocumento, IUser, PaginatorState } from '../../../../model/model.interfaces';
import { API_URL } from '../../../../../environment/environment';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SessionAjaxService } from '../../../../services/session.ajax.service';
import { DocumentoAjaxService } from '../../../../services/documento.ajax.service';
import { DetallePedidoAjaxService } from '../../../../services/detallePedido.ajax.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-pedido-card-unrouted',
  templateUrl: './pedido-card-unrouted.component.html',
  styleUrls: ['./pedido-card-unrouted.component.css']
})
export class PedidoCardUnroutedComponent implements OnInit {

  @Input() documento!: IDocumento;

  sURL: string = API_URL;

  ref: DynamicDialogRef | undefined;
  imageSrc: string = '';
  oSessionUser: IUser = {} as IUser;

  documentos: IDocumento[] = [];
  detallePedidos: IDetallePedido[] = [];
  oPage: IDetallePedidoPage  | undefined;
  orderField: string = "id";
  orderDirection: string = "asc";
  oPaginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0 };
  status: HttpErrorResponse | null = null;
  precioTotal: number = 0;

  constructor(
    private oSessionService: SessionAjaxService,
    private oDetallePedidoAjaxService: DetallePedidoAjaxService


  ) { }

  ngOnInit() {
    this.getProductPage();
    this.imageSrc = API_URL + "/media/";
  }

  getProductPage(): void {

    this.oSessionService.getSessionUser()
      ?.subscribe({
        next: (data: IUser) => {
          this.oSessionUser = data;

          this.oDetallePedidoAjaxService.getByDocumentoId(
            this.documento.id
          ).subscribe({
            next: (data: IDetallePedidoPage) => {
              this.oPage = data;
              this.detallePedidos = data.content; // Actualiza la lista de productos
              this.oPaginatorState.pageCount = data.totalPages;
              //AHORA CALCULAR EL PRECIO TOTAL DEL CARRITO respecto la pagina de detallepedidos.precio
              this.precioTotal = this.detallePedidos.reduce((acc, item) => acc + item.precio, 0);
            },
            error: (error: HttpErrorResponse) => {
              this.status = error;
            }
          });

        },
        error: (error: HttpErrorResponse) => {
          this.status = error;
        }
      })




  }

}
