import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NoticiaAjaxService } from '../../../../services/noticia.ajax.service';
import { INoticia, INoticiaUpdate, IProducto, IProductoUpdate, IUser, IVisible, formOperation } from '../../../../model/model.interfaces';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { GestionUserSelectionUnroutedComponent } from '../../../usuarios/admin/gestion-user-selection-unrouted/gestion-user-selection-unrouted.component';
import { MediaService } from '../../../../services/media.service';
import { FocusTrap } from 'primeng/focustrap';
import { NgPlural } from '@angular/common';
import { ProductoAjaxService } from '../../../../services/producto.ajax.service';

@Component({
  selector: 'app-gestion-productos-form-unrouted',
  templateUrl: './gestion-productos-form-unrouted.component.html',
  styleUrls: ['./gestion-productos-form-unrouted.component.css']
})
export class GestionProductosFormUnroutedComponent implements OnInit {
  @Input() id: number = 1;
  @Input() operation: formOperation = 'NEW'; //new or edit

  productoForm!: FormGroup;
  oProducto: IProducto  = {} as IProducto;
  oProductoUpdate: IProductoUpdate = {} as IProductoUpdate;
  status: HttpErrorResponse | null = null;
  oDynamicDialogRef: DynamicDialogRef | undefined;
  visibilidad: boolean | null = null;

  visible: IVisible[] = [
    { value: false, label: 'No visible' },
    { value: true, label: 'Visible' }
  ];
  

  constructor(
    private oFormBuilder: FormBuilder,
    private oProductoAjaxService: ProductoAjaxService,
    private oRouter: Router,
    private oMatSnackBar: MatSnackBar,
    public oDialogService: DialogService,
    private MediaService: MediaService
  ) {
    if(this.oProducto){
      this.initializeForm(this.oProducto);
    }
  }

  initializeForm(oProducto: IProducto) {
    this.productoForm = this.oFormBuilder.group({
      id: [oProducto.id],
      nombre: [oProducto.nombre, [Validators.required]],
      descripcion: [oProducto.descripcion, [Validators.required]],
      tamanyo: [oProducto.tamanyo],
      materiales: [oProducto.materiales],
      fecha_creacion: [oProducto.fecha_creacion, [Validators.required]],
      color: [oProducto.color, [Validators.required]],
      precio: [oProducto.precio, [Validators.required]],
      visible: [[oProducto.visible] ,[Validators.required]],
      foto: [oProducto.foto],
      tipo: [oProducto.tipo]
      
    });
  }

  ngOnInit() {
    if (this.operation == 'EDIT') {
      this.oProductoAjaxService.getOne(this.id).subscribe({
        next: (data: IProducto) => {
          this.oProducto = data;
          this.initializeForm(this.oProducto);
        },
        error: (error: HttpErrorResponse) => {
          this.status = error;
          this.oMatSnackBar.open("Error al leer el producto del servidor", '', { duration: 2000 });
        }
      })
    } else {
      if(this.oProducto){
        this.initializeForm(this.oProducto);
      }
      
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.productoForm.controls[controlName].hasError(errorName);
  }

  onSubmit() {
    if (this.productoForm.valid) {

      if (this.operation == 'NEW') {
        this.oProductoAjaxService.newOne(this.productoForm.value).subscribe({
          next: (data: IProducto) => {
            this.oProducto = data;
            this.initializeForm(this.oProducto);
            // avisar al usuario que se ha creado correctamente
            this.oMatSnackBar.open("El producto ha sido creado.", '', { duration: 2000 });
            this.oRouter.navigate(['/gProductos']);
          },
          error: (error: HttpErrorResponse) => {
            this.status = error;
            this.oMatSnackBar.open("No se puede crear el producto.", '', { duration: 2000 });
          }
        })

      } else {
        this.oProducto = this.productoForm.value;
        if(this.oProducto){
          this.oProductoUpdate = {
            id: this.oProducto.id,
            nombre: this.oProducto.nombre,
            descripcion: this.oProducto.descripcion,
            tamanyo: this.oProducto.tamanyo,
            materiales: this.oProducto.materiales,
            fecha_creacion: this.oProducto.fecha_creacion,
            color: this.oProducto.color,
            precio: this.oProducto.precio,
            visible: this.oProducto.visible,
            foto: this.oProducto.foto,
            tipo: this.oProducto.tipo
          }
        }
        if(this.oProductoUpdate){
          this.oProductoAjaxService.updateOne(this.oProductoUpdate).subscribe({
            next: (data: IProductoUpdate) => {
              this.oProductoUpdate = data;
              if(this.oProducto){
                this.initializeForm(this.oProducto);
                this.oMatSnackBar.open("User has been updated.", '', { duration: 2000 });
              this.oRouter.navigate(['/gProductos']);
              }
              
              // avisar al usuario que se ha actualizado correctamente
              
            },
            error: (error: HttpErrorResponse) => {
              this.status = error;
              this.oMatSnackBar.open("Can't update noticia.", '', { duration: 2000 });
            }
          })
        }
        
      }
    }
  }
}
