import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gestion-productos-edit-routed',
  templateUrl: './gestion-productos-edit-routed.component.html',
  styleUrls: ['./gestion-productos-edit-routed.component.css']
})
export class GestionProductosEditRoutedComponent implements OnInit {

  id: number = 1;

  constructor(
    private oActivatedRoute: ActivatedRoute
  ) {
    this.id = parseInt(this.oActivatedRoute.snapshot.paramMap.get("id") || "1");
  }

  ngOnInit() {
  }

}
