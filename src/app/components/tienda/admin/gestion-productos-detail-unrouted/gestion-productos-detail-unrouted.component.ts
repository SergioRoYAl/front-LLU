import { Component, Input, OnInit, Optional } from '@angular/core';
import { IProducto } from '../../../../model/model.interfaces';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductoAjaxService } from '../../../../services/producto.ajax.service';
import { ActivatedRoute } from '@angular/router';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-gestion-productos-detail-unrouted',
  templateUrl: './gestion-productos-detail-unrouted.component.html',
  styleUrls: ['./gestion-productos-detail-unrouted.component.css']
})
export class GestionProductosDetailUnroutedComponent implements OnInit {

  
  @Input() id: number = 1;

  oProducto: IProducto = {} as IProducto;
  status: HttpErrorResponse | null = null;

  constructor(
    private oProductoAjaxService: ProductoAjaxService,
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
    if(this.oProducto){
      this.getOne();
    }
    
  }

  

  getOne(): void {
    if(this.oProducto){
      this.oProductoAjaxService.getOne(this.id).subscribe({
        next: (data: IProducto) => {
          this.oProducto = data;
        },
        error: (error: HttpErrorResponse) => {
          this.status = error;
        }
  
      })
    }
      
    

  }

}
