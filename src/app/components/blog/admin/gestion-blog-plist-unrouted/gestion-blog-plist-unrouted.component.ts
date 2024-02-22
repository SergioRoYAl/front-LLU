import { Component, Input, OnInit } from '@angular/core';
import { INoticia, INoticiaPage, IUser, IUserPage} from '../../../../model/model.interfaces';
import { PaginatorState } from 'primeng/paginator';
import { HttpErrorResponse } from '@angular/common/http';
import { UserAjaxService } from '../../../../services/user.ajax.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmEventType, ConfirmationService } from 'primeng/api';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { GestionBlogDetailUnroutedComponent } from '../gestion-blog-detail-unrouted/gestion-blog-detail-unrouted.component';
import { NoticiaAjaxService } from '../../../../services/noticia.ajax.service';
import { MediaService } from '../../../../services/media.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GestionBlogUploadUnroutedComponent } from '../gestion-blog-upload-unrouted/gestion-blog-upload-unrouted.component';
@Component({
  selector: 'app-gestion-blog-plist-unrouted',
  templateUrl: './gestion-blog-plist-unrouted.component.html',
  styleUrls: ['./gestion-blog-plist-unrouted.component.css']
})
export class GestionBlogPlistUnroutedComponent implements OnInit {

  @Input() forceReload: Subject<boolean> = new Subject<boolean>();
  bLoading: boolean = false;

  ref: DynamicDialogRef | undefined;

  oPage: INoticiaPage | undefined;
  orderField: string = "id";
  orderDirection: string = "asc";
  oPaginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0 };
  status: HttpErrorResponse | null = null;
  oNoticiaToRemove: INoticia | null = null;
  

  constructor(
    private oNoticiaAjaxService: NoticiaAjaxService,
    public oDialogService: DialogService,
    private oCconfirmationService: ConfirmationService,
    private oMatSnackBar: MatSnackBar,
   
    private FormBuilder: FormBuilder
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
    this.oNoticiaAjaxService.getPage(this.oPaginatorState.rows, this.oPaginatorState.page, this.orderField, this.orderDirection).subscribe({
      next: (data: INoticiaPage) => {
        this.oPage = data;
        this.oPaginatorState.pageCount = data.totalPages;
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    })
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

  

  doView(n: INoticia) {
    this.ref = this.oDialogService.open(GestionBlogDetailUnroutedComponent, {
      data: {
        id: n.id
      },
      header: "Detalle de noticia",
      width: "50%",
      contentStyle: { overflow: "auto"},
      baseZIndex: 10000,
      maximizable: false
    });
  }

  doRemove(n: INoticia) {
    this.oNoticiaToRemove = n;
    this.oCconfirmationService.confirm({
      accept: () => {
        this.oMatSnackBar.open("The user has been removed.", '', { duration: 2000 });
        this.oNoticiaAjaxService.removeOne(this.oNoticiaToRemove?.id).subscribe({
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

  

  abrirDialogo(n: INoticia) {
    const ref = this.oDialogService.open(GestionBlogUploadUnroutedComponent, {
      data: { noticia: n}
    });
  }

}
