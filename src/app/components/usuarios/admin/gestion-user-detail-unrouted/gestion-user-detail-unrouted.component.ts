import { Component, Input, OnInit, Optional } from '@angular/core';
import { IUser } from '../../../../model/model.interfaces';
import { RespuestaAjaxService } from '../../../../services/respuesta.ajax.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserAjaxService } from '../../../../services/user.ajax.service';
import { ActivatedRoute } from '@angular/router';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-gestion-user-detail-unrouted',
  templateUrl: './gestion-user-detail-unrouted.component.html',
  styleUrls: ['./gestion-user-detail-unrouted.component.css']
})
export class GestionUserDetailUnroutedComponent implements OnInit {
  @Input() id: number = 1;

  oUser: IUser = { noticias: {}, respuestas: {}, documentos: {}} as IUser;
  status: HttpErrorResponse | null = null;

  constructor(
    private oUserAjaxService: UserAjaxService,
    private oActivatedRoute: ActivatedRoute,
    @Optional() public ref: DynamicDialogRef,
    @Optional() public config: DynamicDialogConfig
  ) {
    if (config) {
      if (config.data) {
        this.id = config.data.id;
      }
    }
  }

  ngOnInit() {
    this.getOne();
  }

  

  getOne(): void {
    
      this.oUserAjaxService.getOne(this.id).subscribe({
        next: (data: IUser) => {
          this.oUser = data;
        },
        error: (error: HttpErrorResponse) => {
          this.status = error;
        }
  
      })
    

  }

}
