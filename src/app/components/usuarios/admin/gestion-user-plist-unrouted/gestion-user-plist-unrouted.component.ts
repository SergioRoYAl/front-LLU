import { Component, Input, OnInit } from '@angular/core';
import { IUser, IUserPage} from '../../../../model/model.interfaces';
import { PaginatorState } from 'primeng/paginator';
import { HttpErrorResponse } from '@angular/common/http';
import { UserAjaxService } from '../../../../services/user.ajax.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmEventType, ConfirmationService } from 'primeng/api';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, debounceTime, of, switchMap } from 'rxjs';
import { GestionUserDetailUnroutedComponent } from '../gestion-user-detail-unrouted/gestion-user-detail-unrouted.component';
@Component({
  selector: 'app-gestion-user-plist-unrouted',
  templateUrl: './gestion-user-plist-unrouted.component.html',
  styleUrls: ['./gestion-user-plist-unrouted.component.css']
})
export class GestionUserPlistUnroutedComponent implements OnInit {

  @Input() forceReload: Subject<boolean> = new Subject<boolean>();
  @Input() id_user: number = 0;
  bLoading: boolean = false;

  oUser: IUser | null = null;
  oPage: IUserPage | undefined;
  orderField: string = "id";
  orderDirection: string = "asc";
  oPaginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0 };
  status: HttpErrorResponse | null = null;
  oUserToRemove: IUser | null = null;

  constructor(
    private oUserAjaxService: UserAjaxService,
    public oDialogService: DialogService,
    private oCconfirmationService: ConfirmationService,
    private oMatSnackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getPage();
    this.forceReload.subscribe({
      next: (v) => {
        if (v) {
          this.getPage();
        }
      }
    });
  }

  getPage() {
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

  getValue(event: any): string {
    return event.target.value;
  }

  onPageChange(event: PaginatorState) {
    this.oPaginatorState.rows = event.rows;
    this.oPaginatorState.page = event.page;
    this.getPage();
  }

  doOrder(fieldorder: string){
    this.orderField = fieldorder;
    if(this.orderDirection == "asc"){
      this.orderDirection = "desc";
    } else {
      this.orderDirection = "asc";
    }
    this.getPage();
  }

  ref: DynamicDialogRef | undefined;

  doView(u: IUser) {
    this.ref = this.oDialogService.open(GestionUserDetailUnroutedComponent, {
      data: {
        id: u.id
      },
      header: "Detalle de usuario",
      width: "50%",
      contentStyle: { overflow: "auto"},
      baseZIndex: 10000,
      maximizable: false
    });
  }

  doRemove(u: IUser) {
    this.oUserToRemove = u;
    this.oCconfirmationService.confirm({
      accept: () => {
        this.oMatSnackBar.open("The user has been removed.", '', { duration: 2000 });
        this.oUserAjaxService.removeOne(this.oUserToRemove?.id).subscribe({
          next: () => {
            this.getPage();
          },
          error: (error: HttpErrorResponse) => {
            this.status = error;
            this.oMatSnackBar.open("The user hasn't been removed.", "", { duration: 2000 });
          }
        });
      },
      reject: (type: ConfirmEventType) => {
        this.oMatSnackBar.open("The user hasn't been removed.", "", { duration: 2000 });
      }
    });
  }

  search(filterValue: string): void {

      this.oUserAjaxService.getPage(this.oPaginatorState.rows, this.oPaginatorState.first, 'id', 'asc', this.id_user, filterValue)
        .pipe(
          debounceTime(10),
          switchMap((data: IUserPage) => {
            return of(data);
          })
        )
    
    }
  

}
