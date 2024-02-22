import { Component, OnInit } from '@angular/core';
import { IUser } from '../../../model/model.interfaces';
import { SessionAjaxService } from '../../../services/session.ajax.service';
import { UserAjaxService } from '../../../services/user.ajax.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-pedido-routed',
  templateUrl: './pedido-routed.component.html',
  styleUrls: ['./pedido-routed.component.css']
})
export class PedidoRoutedComponent implements OnInit {

  oSessionUser: IUser | null = null;
  strUserName: string = '';

  constructor(
    private oSessionService: SessionAjaxService,
    private oUserAjaxService: UserAjaxService
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
  }

}
