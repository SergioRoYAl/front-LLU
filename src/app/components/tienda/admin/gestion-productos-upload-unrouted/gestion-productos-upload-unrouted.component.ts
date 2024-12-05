import { Component, OnInit } from '@angular/core';
import { IProducto, IProductoUpdate } from '../../../../model/model.interfaces';
import { MediaService } from '../../../../services/media.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProductoAjaxService } from '../../../../services/producto.ajax.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-gestion-productos-upload-unrouted',
  templateUrl: './gestion-productos-upload-unrouted.component.html',
  styleUrls: ['./gestion-productos-upload-unrouted.component.css']
})
export class GestionProductosUploadUnroutedComponent implements OnInit {

  producto: IProducto = {} as IProducto;
  productoUpdate: IProductoUpdate | null = null;
  url: string | undefined;
  helperFoto: string | undefined;

  constructor(
    private MediaService: MediaService,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private ProductoAjaxService: ProductoAjaxService,
    private oMatSnackBar: MatSnackBar,
    private oRouter: Router,
  ) { }

  ngOnInit() {
    this.producto = this.config.data.producto;
  }

  upload(event: any) {
    const file = event.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      this.MediaService.uploadFile(formData)
        .subscribe(response => {
          console.log("response", response);
          this.url = response.url;

          if (this.producto) {
            if (this.url) {
              this.helperFoto = this.url.split('/media/')[1];
              this.productoUpdate = {
                id: this.producto.id,
                nombre: this.producto.nombre,
                descripcion: this.producto.descripcion,
                tamanyo: this.producto.tamanyo,
                materiales: this.producto.materiales,
                fecha_creacion: this.producto.fecha_creacion,
                color: this.producto.color,
                precio: this.producto.precio,
                visible: this.producto.visible,
                foto: this.helperFoto,

                
                tipo: this.producto.tipo
                
              }
            }
          }
          if (this.producto && this.productoUpdate) {
            this.ProductoAjaxService.updateOne(this.productoUpdate).subscribe({
              next: (data: IProductoUpdate) => {
                this.productoUpdate = data;
                this.oMatSnackBar.open("User has been updated.", '', { duration: 2000 });
                this.oRouter.navigate(['/gProducto', 'producto', 'view', this.productoUpdate.id]);
              },
              error: (error: HttpErrorResponse) => {
                this.oMatSnackBar.open("Can't update producto.", '', { duration: 2000 });
              }
            });
          }
          });

    }
  }
}
