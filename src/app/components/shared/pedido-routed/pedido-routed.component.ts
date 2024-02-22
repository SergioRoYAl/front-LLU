import { Component, OnInit } from '@angular/core';
import { IDocumento, IDocumentoPage, IUser, PaginatorState } from '../../../model/model.interfaces';
import { SessionAjaxService } from '../../../services/session.ajax.service';
import { UserAjaxService } from '../../../services/user.ajax.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DocumentoAjaxService } from '../../../services/documento.ajax.service';

@Component({
  selector: 'app-pedido-routed',
  templateUrl: './pedido-routed.component.html',
  styleUrls: ['./pedido-routed.component.css']
})
export class PedidoRoutedComponent implements OnInit {

  oSessionUser: IUser | null = null;
  strUserName: string = '';

  documentos: IDocumento[] = [];
  oPage: IDocumentoPage  | undefined;
  orderField: string = "id";
  orderDirection: string = "asc";
  oPaginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0 };
  status: HttpErrorResponse | null = null;


  constructor(
    private oSessionService: SessionAjaxService,
    private oUserAjaxService: UserAjaxService,
    private oDocumentoAjaxService: DocumentoAjaxService,
  ) { }

  ngOnInit() {
    this.strUserName = this.oSessionService.getUsername();
    this.oUserAjaxService.getByUsername(this.oSessionService.getUsername()).subscribe({
      next: (oUser: IUser) => {
        this.oSessionUser = oUser;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });
    this.getDocumentPage();
  }

  
  getDocumentPage(): void {
    this.strUserName = this.oSessionService.getUsername();
    this.oUserAjaxService.getByUsername(this.oSessionService.getUsername())
    .subscribe({
      next: (data: IUser) => {
        this.oSessionUser = data;

        this.oDocumentoAjaxService.getPageByUser(
          this.oPaginatorState.rows,
          this.oPaginatorState.page,
          this.orderField,
          this.orderDirection,
          this.oSessionUser.id
        ).subscribe({
          next: (data: IDocumentoPage) => {
            this.oPage = data;
            this.documentos = data.content; // Actualiza la lista de productos
            this.oPaginatorState.pageCount = data.totalPages;
          },
          error:(error: HttpErrorResponse) => {
            this.status = error;
          }
        });
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });

    
  }

  onPageChange(event: PaginatorState) {
    this.oPaginatorState.rows = event.rows;
    this.oPaginatorState.page = event.page; // Actualiza el primer índice
    this.getDocumentPage();
  }
}
