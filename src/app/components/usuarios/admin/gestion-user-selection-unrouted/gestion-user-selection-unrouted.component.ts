import { Component, OnInit } from '@angular/core';
import { IUser, IUserPage, PaginatorState } from '../../../../model/model.interfaces';
import { HttpErrorResponse } from '@angular/common/http';
import { UserAjaxService } from '../../../../services/user.ajax.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-gestion-user-selection-unrouted',
  templateUrl: './gestion-user-selection-unrouted.component.html',
  styleUrls: ['./gestion-user-selection-unrouted.component.css']
})
export class GestionUserSelectionUnroutedComponent implements OnInit {

  oPage: IUserPage | undefined;
  orderField: string = "id";
  orderDirection: string = "asc";
  oPaginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0 };
  status: HttpErrorResponse | null = null;
  oUserToRemove: IUser | null = null;

  constructor(
    private oUserAjaxService: UserAjaxService,
    public oDialogService: DialogService,
    public oDynamicDialogRef: DynamicDialogRef
  ) { }

  ngOnInit() {
    this.getPage();
  }

  getPage(): void {
    this.oUserAjaxService.getPage(this.oPaginatorState.rows, this.oPaginatorState.page, this.orderField, this.orderDirection).subscribe({    
      next: (data: IUserPage) => {
        this.oPage = data;
        this.oPaginatorState.pageCount = data.totalPages;
        console.log(this.oPaginatorState);
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    })
  }

  onPageChang(event: PaginatorState) {
    this.oPaginatorState.rows = event.rows;
    this.oPaginatorState.page = event.page;
    this.getPage();
  }

  doOrder(fieldorder: string) {
    this.orderField = fieldorder;
    if (this.orderDirection == "asc") {
      this.orderDirection = "desc";
    } else {
      this.orderDirection = "asc";
    }
    this.getPage();
  }

  onSelectUser(oUser: IUser) {
    this.oDynamicDialogRef.close(oUser);
  }

}
