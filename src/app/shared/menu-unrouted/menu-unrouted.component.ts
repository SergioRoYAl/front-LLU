import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SessionAjaxService } from '../../services/session.ajax.service';
import { Router } from '@angular/router';
import { CryptoService } from '../../services/crypto.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-menu-unrouted',
  templateUrl: './menu-unrouted.component.html',
  styleUrls: ['./menu-unrouted.component.css']
})
export class MenuUnroutedComponent implements OnInit {

  visible: boolean = false;
  isNavbarActive = false;

  constructor(
    
  ) { }

  toggleNavbar() {
    this.isNavbarActive = !this.isNavbarActive;
  }

  showDialog() {
      this.visible = true;
  }

  closeDialog() {
      this.visible = false;
  } 

  ngOnInit() {
  }

}

