import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, Optional } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { INoticia } from '../../../../model/model.interfaces';
import { NoticiaAjaxService } from '../../../../services/noticia.ajax.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gestion-blog-detail-unrouted',
  templateUrl: './gestion-blog-detail-unrouted.component.html',
  styleUrls: ['./gestion-blog-detail-unrouted.component.css']
})

export class GestionBlogDetailUnroutedComponent implements OnInit {

  @Input() id: number = 1;

  oNoticia: INoticia = { usuario: {}} as INoticia;
  status: HttpErrorResponse | null = null;

  constructor(
    private oNoticiaAjaxService: NoticiaAjaxService,
    private oActivatedRoute: ActivatedRoute,
    @Optional() public ref: DynamicDialogRef,
    @Optional() public config: DynamicDialogConfig
  ) {
    if (config) {
      if (config.data) {
        this.id = config.data.id;
      }
    }
  }

  ngOnInit() {
    this.getOne();
  }

  

  getOne(): void {
    
      this.oNoticiaAjaxService.getOne(this.id).subscribe({
        next: (data: INoticia) => {
          this.oNoticia = data;
        },
        error: (error: HttpErrorResponse) => {
          this.status = error;
        }
  
      })
    

  }

}
