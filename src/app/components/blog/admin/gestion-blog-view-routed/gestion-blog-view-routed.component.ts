import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gestion-blog-view-routed',
  templateUrl: './gestion-blog-view-routed.component.html',
  styleUrls: ['./gestion-blog-view-routed.component.css']
})
export class GestionBlogViewRoutedComponent implements OnInit {
 
  id: number = 1;

  constructor(private oActivatedRoute: ActivatedRoute) {
    this.id = parseInt(this.oActivatedRoute.snapshot.paramMap.get("id") || "1");
  }

  ngOnInit() {
    
  }

}
