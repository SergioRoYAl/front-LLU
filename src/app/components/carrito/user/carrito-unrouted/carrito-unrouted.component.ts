import { Component, OnInit } from '@angular/core';
import { SessionAjaxService } from '../../../../services/session.ajax.service';
import { NavigationEnd, Router } from '@angular/router';
import { UserAjaxService } from '../../../../services/user.ajax.service';
import { IDetallePedido, IDetallePedidoPage, IDocumento, IDocumentoPage, IUser, PaginatorState } from '../../../../model/model.interfaces';
import { Subject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { DocumentoAjaxService } from '../../../../services/documento.ajax.service';
import { DetallePedidoAjaxService } from '../../../../services/detallePedido.ajax.service';

@Component({
  selector: 'app-carrito-unrouted',
  templateUrl: './carrito-unrouted.component.html',
  styleUrls: ['./carrito-unrouted.component.css']
})
export class CarritoUnroutedComponent implements OnInit {

  strUserName: string = '';
  visible: boolean = false;
  private unsubscribe$ = new Subject<void>();
  isNavbarActive = false;
  oSessionUser: IUser | null = null;
  strUrl: string = '';

  usuario: IUser = {} as IUser;
  documento: IDocumento = { usuario: {} } as IDocumento;
  detallepedidos: IDetallePedido[] = [];
  oPage: IDetallePedidoPage | undefined;
  orderField: string = "id";
  orderDirection: string = "asc";
  oPaginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0 };
  status: HttpErrorResponse | null = null;
  documentoAEnviar: IDocumento = { usuario: {} } as IDocumento;
  precioTotal: number = 0;

  constructor(
    private oSessionService: SessionAjaxService,
    private oUserAjaxService: UserAjaxService,
    private oDocumentoAjaxService: DocumentoAjaxService,
    private oDetallePedidoAjaxService: DetallePedidoAjaxService,
    private oRouter: Router,

  ) {
    this.oRouter.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.strUrl = ev.url;
      }
    })

    this.strUserName = oSessionService.getUsername();
    this.oUserAjaxService.getByUsername(this.oSessionService.getUsername()).subscribe({
      next: (oUser: IUser) => {
        this.oSessionUser = oUser;
        this.strUserName = oUser.username;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });
  }

  ngOnInit() {
    this.getProductPage();
  }

  getProductPage(): void {

    this.oSessionService.getSessionUser()
      ?.subscribe({
        next: (data: IUser) => {
          this.oSessionUser = data;

          this.oDocumentoAjaxService.lastPendiente(this.oSessionUser.id)
            .subscribe({
              next: (data: IDocumento) => {
                this.documento = data;

                this.oDetallePedidoAjaxService.getByDocumentoId(
                  this.documento.id
                ).subscribe({
                  next: (data: IDetallePedidoPage) => {
                    this.oPage = data;
                    this.detallepedidos = data.content; // Actualiza la lista de productos
                    this.oPaginatorState.pageCount = data.totalPages;
                    //AHORA CALCULAR EL PRECIO TOTAL DEL CARRITO respecto la pagina de detallepedidos.precio
                    this.precioTotal = this.detallepedidos.reduce((acc, item) => acc + item.precio, 0);
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

        },
        error: (error: HttpErrorResponse) => {
          this.status = error;
        }
      })




  }

  comprar() {

  }

  encargar() {
    const fechaActual = new Date();

    // Obtener los componentes de la fecha (año, mes y día)
    const año = fechaActual.getFullYear();
    const mes = ('0' + (fechaActual.getMonth() + 1)).slice(-2); // Se suma 1 al mes porque los meses comienzan desde 0
    const dia = ('0' + fechaActual.getDate()).slice(-2);

    // Formatear la fecha en el formato deseado (YYYY-MM-DD)
    const fechaFormateada = `${año}-${mes}-${dia}`;


    this.oSessionService.getSessionUser()
      ?.subscribe({
        next: (data: IUser) => {
          this.oSessionUser = data;

          this.oDocumentoAjaxService.lastPendiente(this.oSessionUser.id)
            .subscribe({
              next: (data: IDocumento) => {
                this.documento = data;
                this.documentoAEnviar = {
                  id: this.documento.id,
                  fecha_pedido: fechaFormateada,
                  usuario: { id: this.documento.usuario.id } as IUser,
                }

                this.oDocumentoAjaxService.updateOne(this.documentoAEnviar)
                .subscribe({
                  next: (data: IDocumento) => {
                    this.documento = data;
                    this.getProductPage();
                    window.location.reload();
                    
                  },
                  error: (error: HttpErrorResponse) => {
                    this.status = error;
                  }
                })

              },
              error: (error: HttpErrorResponse) => {
                this.status = error;
              }
            })

        },
        error: (error: HttpErrorResponse) => {
          this.status = error;
        }
      })
   
  }

  onPageChange(event: PaginatorState) {
    this.oPaginatorState.rows = event.rows;
    this.oPaginatorState.page = event.page; // Actualiza el primer índice
    this.getProductPage();
  }



}
