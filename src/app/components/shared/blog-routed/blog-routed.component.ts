import { Component, OnInit } from '@angular/core';
import { INoticia, INoticiaPage } from '../../../model/model.interfaces';
import { NoticiaAjaxService } from '../../../services/noticia.ajax.service';

@Component({
  selector: 'app-blog-routed',
  templateUrl: './blog-routed.component.html',
  styleUrls: ['./blog-routed.component.css']
})
export class BlogRoutedComponent implements OnInit {

  noticias: INoticia[] = [];

  constructor(
    private NoticiaAjaxService: NoticiaAjaxService,
  ) { }

  ngOnInit() {
    this.getProductPage();
  }

  getProductPage(size: number = 10, page: number = 0, orderField: string = "id", orderDirection: string = "asc"): void {
    this.NoticiaAjaxService.getPageVisible(size, page, orderField, orderDirection).subscribe((data: INoticiaPage) => {
      this.noticias = data.content;
    });
  }
}
