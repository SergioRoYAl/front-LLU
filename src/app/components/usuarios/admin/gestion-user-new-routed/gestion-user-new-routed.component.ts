import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gestion-user-new-routed',
  templateUrl: './gestion-user-new-routed.component.html',
  styleUrls: ['./gestion-user-new-routed.component.css']
})
export class GestionUserNewRoutedComponent implements OnInit {

  id: number = 1;

  constructor(
    private oActivatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = parseInt(this.oActivatedRoute.snapshot.paramMap.get("id") || "1");
  }

}
