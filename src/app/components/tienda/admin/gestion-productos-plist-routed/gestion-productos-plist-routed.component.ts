import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoAjaxService } from '../../../../services/producto.ajax.service';
import { ConfirmationService } from 'primeng/api';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-gestion-productos-plist-routed',
  templateUrl: './gestion-productos-plist-routed.component.html',
  styleUrls: ['./gestion-productos-plist-routed.component.css']
})
export class GestionProductosPlistRoutedComponent implements OnInit {

  forceReload: Subject<boolean> = new Subject<boolean>();
  id_user: number;
  bLoading: boolean = false;

  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oProductoAjaxService: ProductoAjaxService,
    private oConfirmationService: ConfirmationService,
    private oMatSnackBar: MatSnackBar
  ) {
    this.id_user = parseInt(this.oActivatedRoute.snapshot.paramMap.get("id") ?? "0");
  }

  ngOnInit() { }


}
