import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gestion-productos-view-routed',
  templateUrl: './gestion-productos-view-routed.component.html',
  styleUrls: ['./gestion-productos-view-routed.component.css']
})
export class GestionProductosViewRoutedComponent implements OnInit {

  id: number = 1;

  constructor(private oActivatedRoute: ActivatedRoute) {
    this.id = parseInt(this.oActivatedRoute.snapshot.paramMap.get("id") || "1");
  }

  ngOnInit() {
    
  }
}
