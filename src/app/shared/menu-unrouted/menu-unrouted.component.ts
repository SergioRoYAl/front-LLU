import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SessionAjaxService } from '../../services/session.ajax.service';
import { NavigationEnd, Router } from '@angular/router';
import { CryptoService } from '../../services/crypto.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IUser, SessionEvent } from '../../model/model.interfaces';
import { UserAjaxService } from '../../services/user.ajax.service';
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-menu-unrouted',
  templateUrl: './menu-unrouted.component.html',
  styleUrls: ['./menu-unrouted.component.css']
})
export class MenuUnroutedComponent implements OnInit {

  strUserName: string = '';
  visible: boolean = false;
  private unsubscribe$ = new Subject<void>();
  isNavbarActive = false;
  oSessionUser: IUser | null = null;
  strUrl: string = '';

  constructor(
    private oSessionService: SessionAjaxService,
    public oDialogService: DialogService,
    private oUserAjaxService: UserAjaxService,
    private oRouter: Router
    
  ) { 
    this.oRouter.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd){
        this.strUrl = ev.url;
      }})

    this.strUserName = oSessionService.getUsername();
    this.oUserAjaxService.getByUsername(this.oSessionService.getUsername()).subscribe({
      next: (oUser: IUser) => {
        this.oSessionUser = oUser;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });
  }



  toggleNavbar() {
    this.isNavbarActive = !this.isNavbarActive;
  }

  showDialog() {
      this.visible = true;
  }

  closeDialog() {
      this.visible = false;
  } 

  ngOnInit() {
    this.oSessionService.on().subscribe({
      next: (data: SessionEvent) => {
        if (data.type == "login") {
          this.strUserName = this.oSessionService.getUsername();
          this.oUserAjaxService.getByUsername(this.oSessionService.getUsername()).subscribe({
            next: (oUser: IUser) => {
              this.oSessionUser = oUser;
            },
            error: (error: HttpErrorResponse) => {
              console.log(error);
            }
          })
        }
        if (data.type == "logout") {
          this.strUserName = "";
        }
      }
    });
    this.oSessionService.loginSuccessEvent
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        // Cerrar el diálogo cuando se detecta un inicio de sesión exitoso
        this.closeDialog();
      });
  }

}

