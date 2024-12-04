import { Component, OnInit } from '@angular/core';
import { IUser } from '../../../../model/model.interfaces';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserAjaxService } from '../../../../services/user.ajax.service';
import { CryptoService } from '../../../../services/crypto.service';

@Component({
  selector: 'app-user-form-unrouted',
  templateUrl: './user-form-unrouted.component.html',
  styleUrls: ['./user-form-unrouted.component.css']
})
export class UserFormUnroutedComponent implements OnInit { //new or edit

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
    private oCryptoService: CryptoService,
    private oMatSnackBar: MatSnackBar,
    public oDialogService: DialogService,
  ) {
    if(this.oUser){
      
      this.initializeForm(this.oUser);
    } 
  }

  initializeForm(oUser: IUser) {
    this.userForm = this.oFormBuilder.group({
      id: null,
      nombre: [oUser.nombre, [Validators.required]],
      apellidos: [oUser.apellidos, [Validators.required]],
      direccion: [oUser.direccion],
      username: [oUser.username],
      password: [oUser.password, [Validators.required]],
      role: false,
      fecha_nacimiento: [oUser.fecha_nacimiento, [Validators.required]],
      email: [oUser.email, [Validators.required]]
      
    });
  }

  ngOnInit() {
    this.initializeForm(this.oUser);
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.userForm.controls[controlName].hasError(errorName);
  }

  onSubmit() {
    if (this.userForm.valid) {
      
        this.userForm.value.password = this.oCryptoService.getSHA256(this.userForm.value.password);
        this.oUserAjaxService.newOne(this.userForm.value).subscribe({
          next: (data: IUser) => {
            console.log(this.userForm.value);
            this.oUser = data;
            // avisar al usuario que se ha creado correctamente
            this.oMatSnackBar.open("El usuario ha sido creado.", '', { duration: 2000 });
            window.location.reload(); 
          },
          error: (error: HttpErrorResponse) => {
            this.status = error;
            this.oMatSnackBar.open("No se puede crear el usuario.", '', { duration: 2000 });
            
             
          }
        })
     
        
      }
    }
  }


