import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SessionAjaxService } from '../../../services/session.ajax.service';
import { Router } from '@angular/router';
import { CryptoService } from '../../../services/crypto.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-unrouted',
  templateUrl: './login-unrouted.component.html',
  styleUrls: ['./login-unrouted.component.css']
})
export class LoginUnroutedComponent implements OnInit {

  loginForm: FormGroup;
  loggedIn = false;
  status: HttpErrorResponse | null = null;

  constructor(
    private fb: FormBuilder,
    private oSessionService: SessionAjaxService,
    private oRouter: Router,
    private oCryptoService: CryptoService,
    private oMatSnackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
   }

  ngOnInit() {
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.oSessionService.login(this.loginForm.value.username, this.oCryptoService.getSHA256(this.loginForm.value.password)).subscribe({
        next: (data: string) => {
          this.oSessionService.setToken(data);
          this.oSessionService.emit({ type: 'login' });
          this.oMatSnackBar.open("Loggin successfull.", '', { duration: 2000 });
          this.oRouter.navigate(['/']);

          //close the dialog
          
          this.oSessionService.setLoggedIn(true);
        },
        error: (error: HttpErrorResponse) => {
          this.status = error;
          this.oMatSnackBar.open("Error in loggin operation.", '', { duration: 2000 });
        }
      });
    }
  }

 

  onReset() {
    this.loginForm.reset();
  }

}
