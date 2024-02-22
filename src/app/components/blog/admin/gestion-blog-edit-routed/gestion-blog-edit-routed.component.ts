import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gestion-blog-edit-routed',
  templateUrl: './gestion-blog-edit-routed.component.html',
  styleUrls: ['./gestion-blog-edit-routed.component.css']
})
export class GestionBlogEditRoutedComponent implements OnInit {

  id: number = 1;

  constructor(
    private oActivatedRoute: ActivatedRoute
  ) {
    this.id = parseInt(this.oActivatedRoute.snapshot.paramMap.get("id") || "1");
  }

  ngOnInit() {
  }

}
