import { Component, Input, OnInit } from '@angular/core';
import { INoticia, INoticiaPage, IProducto, IProductoPage, IUser, IUserPage} from '../../../../model/model.interfaces';
import { PaginatorState } from 'primeng/paginator';
import { HttpErrorResponse } from '@angular/common/http';
import { UserAjaxService } from '../../../../services/user.ajax.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmEventType, ConfirmationService } from 'primeng/api';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { NoticiaAjaxService } from '../../../../services/noticia.ajax.service';
import { MediaService } from '../../../../services/media.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProductoAjaxService } from '../../../../services/producto.ajax.service';
import { GestionProductosDetailUnroutedComponent } from '../../../tienda/admin/gestion-productos-detail-unrouted/gestion-productos-detail-unrouted.component';
import { GestionProductosUploadUnroutedComponent } from '../../../tienda/admin/gestion-productos-upload-unrouted/gestion-productos-upload-unrouted.component';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-gestion-productos-plist-unrouted',
  templateUrl: './gestion-productos-plist-unrouted.component.html',
  styleUrls: ['./gestion-productos-plist-unrouted.component.css']
})
export class GestionProductosPlistUnroutedComponent implements OnInit {

  @Input() forceReload: Subject<boolean> = new Subject<boolean>();
  @Input() id_user: number = 0;
  bLoading: boolean = false;

  ref: DynamicDialogRef | undefined;
  oPage: IProductoPage | undefined;
  orderField: string = "id";
  orderDirection: string = "asc";
  oPaginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0 };
  status: HttpErrorResponse | null = null;
  oProductoToRemove: IProducto = {} as IProducto;
  

  constructor(
    private oProductoAjaxService: ProductoAjaxService,
    public oDialogService: DialogService,
    private oCconfirmationService: ConfirmationService,
    private oMatSnackBar: MatSnackBar,
    private oActivatedRoute: ActivatedRoute,
    private FormBuilder: FormBuilder
  ) { 
    this.id_user = parseInt(this.oActivatedRoute.snapshot.paramMap.get("id") ?? "0");
  }

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
    this.oProductoAjaxService.getPageAdmin(this.oPaginatorState.rows, this.oPaginatorState.page, this.orderField, this.orderDirection).subscribe({
      next: (data: IProductoPage) => {
        this.oPage = data;
        this.oPaginatorState.pageCount = data.totalPages;
        console.log(this.oPaginatorState);
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

  

  doView(n: IProducto) {
    this.ref = this.oDialogService.open(GestionProductosDetailUnroutedComponent, {
      data: {
        id: n.id
      },
      header: "Detalle de producto",
      width: "50%",
      contentStyle: { overflow: "auto"},
      baseZIndex: 10000,
      maximizable: false
    });
  }

  doRemove(p: IProducto) {
    this.oProductoToRemove = p;
    this.oCconfirmationService.confirm({
      accept: () => {
        this.oMatSnackBar.open("The product has been removed.", '', { duration: 2000 });
        this.oProductoAjaxService.removeOne(this.oProductoToRemove?.id).subscribe({
          next: () => {
            this.getPage();
          },
          error: (error: HttpErrorResponse) => {
            this.status = error;
            this.oMatSnackBar.open("The product hasn't been removed.", "", { duration: 2000 });
          }
        });
      },
      reject: (type: ConfirmEventType) => {
        this.oMatSnackBar.open("The product hasn't been removed.", "", { duration: 2000 });
      }
    });
  }

  

  abrirDialogo(p: IProducto) {
    const ref = this.oDialogService.open(GestionProductosUploadUnroutedComponent, {
      data: { producto: p}
    });
  }

}
