import { Component, Input, OnInit } from '@angular/core';
import { INoticia } from '../../../../model/model.interfaces';
import { API_URL } from '../../../../../environment/environment';

@Component({
  selector: 'app-blog-card-unrouted',
  templateUrl: './blog-card-unrouted.component.html',
  styleUrls: ['./blog-card-unrouted.component.css']
})
export class BlogCardUnroutedComponent implements OnInit {

  @Input() noticia!: INoticia;
  imageSrc: string = "";

  constructor() { }

  ngOnInit() {
    this.imageSrc = this.noticia.foto;

}
}
