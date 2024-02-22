import { Component, Input, OnInit } from '@angular/core';
import { IUser, formOperation } from '../../../../model/model.interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UserAjaxService } from '../../../../services/user.ajax.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-gestion-user-form-unrouted',
  templateUrl: './gestion-user-form-unrouted.component.html',
  styleUrls: ['./gestion-user-form-unrouted.component.css']
})
export class GestionUserFormUnroutedComponent implements OnInit {

  @Input() id: number = 1;
  @Input() operation: formOperation = 'NEW'; //new or edit

  userForm!: FormGroup;
  oUser: IUser  = {} as IUser;
  oUserUpdate: IUser = {} as IUser;
  status: HttpErrorResponse | null = null;
  oDynamicDialogRef: DynamicDialogRef | undefined;
  visibilidad: boolean | null = null;


  

  constructor(
    private oFormBuilder: FormBuilder,
    private oUserAjaxService: UserAjaxService,
    private oRouter: Router,
    private oMatSnackBar: MatSnackBar,
    public oDialogService: DialogService,
  ) {
    if(this.oUser){
      this.initializeForm(this.oUser);
    }
  }

  initializeForm(oUser: IUser) {
    this.userForm = this.oFormBuilder.group({
      id: [oUser.id],
      nombre: [oUser.nombre, [Validators.required]],
      apellidos: [oUser.apellidos, [Validators.required]],
      direccion: [oUser.direccion],
      username: [oUser.username],
      role: [oUser.role, [Validators.required]],
      fecha_nacimiento: [oUser.fecha_nacimiento, [Validators.required]],
      email: [oUser.email, [Validators.required]]
      
    });
  }

  ngOnInit() {
    if (this.operation == 'EDIT') {
      this.oUserAjaxService.getOne(this.id).subscribe({
        next: (data: IUser) => {
          this.oUser = data;
          this.initializeForm(this.oUser);
        },
        error: (error: HttpErrorResponse) => {
          this.status = error;
          this.oMatSnackBar.open("Error al leer el producto del servidor", '', { duration: 2000 });
        }
      })
    } else {
      if(this.oUser){
        this.initializeForm(this.oUser);
      }
      
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.userForm.controls[controlName].hasError(errorName);
  }

  onSubmit() {
    if (this.userForm.valid) {

      if (this.operation == 'NEW') {
        this.oUserAjaxService.newOne(this.userForm.value).subscribe({
          next: (data: IUser) => {
            this.oUser = data;
            this.initializeForm(this.oUser);
            // avisar al usuario que se ha creado correctamente
            this.oMatSnackBar.open("El usuario ha sido creado.", '', { duration: 2000 });
            this.oRouter.navigate(['/gUsuarios']);
          },
          error: (error: HttpErrorResponse) => {
            this.status = error;
            this.oMatSnackBar.open("No se puede crear el usuario.", '', { duration: 2000 });
          }
        })

      } else {
        this.oUser = this.userForm.value;
        if(this.oUser){
          this.oUserUpdate = this.oUser;
        }
        if(this.oUserUpdate){
          this.oUserAjaxService.updateOne(this.oUserUpdate).subscribe({
            next: (data: IUser) => {
              this.oUserUpdate = data;
              if(this.oUser){
                this.initializeForm(this.oUser);
                this.oMatSnackBar.open("User has been updated.", '', { duration: 2000 });
              this.oRouter.navigate(['/gUsuarios']);
              }
              
              // avisar al usuario que se ha actualizado correctamente
              
            },
            error: (error: HttpErrorResponse) => {
              this.status = error;
              this.oMatSnackBar.open("Can't update user.", '', { duration: 2000 });
            }
          })
        }
        
      }
    }
  }

}
