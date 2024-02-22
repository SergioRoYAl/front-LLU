import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NoticiaAjaxService } from '../../../../services/noticia.ajax.service';
import { INoticia, INoticiaUpdate, IUser, IVisible, formOperation } from '../../../../model/model.interfaces';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { GestionUserSelectionUnroutedComponent } from '../../../usuarios/admin/gestion-user-selection-unrouted/gestion-user-selection-unrouted.component';
import { MediaService } from '../../../../services/media.service';
import { FocusTrap } from 'primeng/focustrap';

@Component({
  selector: 'app-gestion-blog-form-unrouted',
  templateUrl: './gestion-blog-form-unrouted.component.html',
  styleUrls: ['./gestion-blog-form-unrouted.component.css']
})
export class GestionBlogFormUnroutedComponent implements OnInit {
  @Input() id: number = 1;
  @Input() operation: formOperation = 'NEW'; //new or edit

  noticiaForm!: FormGroup;
  oNoticia: INoticia = { usuario: {} } as INoticia;
  oNoticiaUpdate: INoticiaUpdate = { usuario: { id: 0 } } as INoticiaUpdate;
  status: HttpErrorResponse | null = null;
  oDynamicDialogRef: DynamicDialogRef | undefined;
  visibilidad: boolean | null = null;

  visible: IVisible[] = [
    { value: false, label: 'No visible' },
    { value: true, label: 'Visible' }
  ];
  

  constructor(
    private oFormBuilder: FormBuilder,
    private oNoticiaAjaxService: NoticiaAjaxService,
    private oRouter: Router,
    private oMatSnackBar: MatSnackBar,
    public oDialogService: DialogService,
    private MediaService: MediaService
  ) {
    this.initializeForm(this.oNoticia);
  }

  initializeForm(oNoticia: INoticia) {
    this.noticiaForm = this.oFormBuilder.group({
      id: [oNoticia.id],
      titulo: [oNoticia.titulo, [Validators.required]],
      descripcion: [oNoticia.descripcion, [Validators.required]],
      usuario: this.oFormBuilder.group({
        id: [oNoticia.usuario.id, Validators.required]
      }),
      foto: [oNoticia.foto],
      visible: [oNoticia.visible]
      
    });
  }

  ngOnInit() {
    if (this.operation == 'EDIT') {
      this.oNoticiaAjaxService.getOne(this.id).subscribe({
        next: (data: INoticia) => {
          this.oNoticia = data;
          this.initializeForm(this.oNoticia);
        },
        error: (error: HttpErrorResponse) => {
          this.status = error;
          this.oMatSnackBar.open("Error reading noticia from server.", '', { duration: 2000 });
        }
      })
    } else {
      this.initializeForm(this.oNoticia);
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.noticiaForm.controls[controlName].hasError(errorName);
  }

  onSubmit() {
    if (this.noticiaForm.valid) {

      if (this.operation == 'NEW') {
        this.oNoticiaAjaxService.newOne(this.noticiaForm.value).subscribe({
          next: (data: INoticia) => {
            this.oNoticia = data;
            this.initializeForm(this.oNoticia);
            // avisar al usuario que se ha creado correctamente
            this.oMatSnackBar.open("Noticia has been created.", '', { duration: 2000 });
            this.oRouter.navigate(['/gBlog']);
          },
          error: (error: HttpErrorResponse) => {
            this.status = error;
            this.oMatSnackBar.open("Can't create noticia.", '', { duration: 2000 });
          }
        })

      } else {
        this.oNoticia = this.noticiaForm.value;
        this.oNoticiaUpdate = {
          id: this.oNoticia.id,
          titulo: this.oNoticia.titulo,
          descripcion: this.oNoticia.descripcion,
          usuario: { id: this.oNoticia.usuario.id },
          foto: this.oNoticia.foto,
          visible: this.oNoticia.visible
        
        }
        this.oNoticiaAjaxService.updateOne(this.oNoticiaUpdate).subscribe({
          next: (data: INoticiaUpdate) => {
            this.oNoticiaUpdate = data;
            this.initializeForm(this.oNoticia);
            // avisar al usuario que se ha actualizado correctamente
            this.oMatSnackBar.open("User has been updated.", '', { duration: 2000 });
            this.oRouter.navigate(['/gBlog', 'noticia', 'view', this.oNoticia.id]);
          },
          error: (error: HttpErrorResponse) => {
            this.status = error;
            this.oMatSnackBar.open("Can't update noticia.", '', { duration: 2000 });
          }
        })
      }
    }
  }

  onShowUsersSelection() {
    this.oDynamicDialogRef = this.oDialogService.open(GestionUserSelectionUnroutedComponent, {
      header: 'Select a Usuario',
      width: '80%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true
    });

    this.oDynamicDialogRef.onClose.subscribe((oUser: IUser) => {
      if (oUser) {
        this.oNoticia.usuario = oUser;
        this.noticiaForm.controls['usuario'].patchValue({ id: oUser.id })
      }
    });
  }

  


}
