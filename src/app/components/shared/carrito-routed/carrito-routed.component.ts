import { Component, OnInit } from '@angular/core';
import { IDocumento, IDocumentoPage, IUser, PaginatorState } from '../../../model/model.interfaces';
import { HttpErrorResponse } from '@angular/common/http';
import { DocumentoAjaxService } from '../../../services/documento.ajax.service';
import { SessionAjaxService } from '../../../services/session.ajax.service';
import { UserAjaxService } from '../../../services/user.ajax.service';

@Component({
  selector: 'app-carrito-routed',
  templateUrl: './carrito-routed.component.html',
  styleUrls: ['./carrito-routed.component.css']
})
export class CarritoRoutedComponent implements OnInit {

  oSessionUser: IUser | null = null;
  strUserName: string = '';

  constructor(
    private oSessionService: SessionAjaxService,
    private oUserAjaxService: UserAjaxService
  ) { }

  ngOnInit() {

  }

  

}
