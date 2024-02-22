import { Component, OnInit } from '@angular/core';
import { MediaService } from '../../../../services/media.service';
import { INoticia, INoticiaUpdate } from '../../../../model/model.interfaces';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { NoticiaAjaxService } from '../../../../services/noticia.ajax.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { FooterUnroutedComponent } from '../../../shared/footer-unrouted/footer-unrouted.component';

@Component({
  selector: 'app-gestion-blog-upload-unrouted',
  templateUrl: './gestion-blog-upload-unrouted.component.html',
  styleUrls: ['./gestion-blog-upload-unrouted.component.css']
})
export class GestionBlogUploadUnroutedComponent implements OnInit {

  noticia: INoticia | null = null;
  noticiaUpdate: INoticiaUpdate | null = null;
  url: string | undefined;

  constructor(
    private MediaService: MediaService,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private NoticiaAjaxService: NoticiaAjaxService,
    private oMatSnackBar: MatSnackBar,
    private oRouter: Router,
  ) { }

  ngOnInit() {
    this.noticia = this.config.data.noticia;
  }

  upload(event: any) {
    const file = event.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      this.MediaService.uploadFile(formData)
        .subscribe(response => {
          console.log("response", response);
          this.url = response.url;

          if (this.noticia) {
            if (this.url) {

              this.noticiaUpdate = {
                id: this.noticia.id,
                titulo: this.noticia.titulo,
                descripcion: this.noticia.descripcion,
                usuario: { id: this.noticia.usuario.id },
                foto: this.url.toString(),
                visible: this.noticia.visible
              }
            }
          }
          if (this.noticia && this.noticiaUpdate) {
            this.NoticiaAjaxService.updateOne(this.noticiaUpdate).subscribe({
              next: (data: INoticiaUpdate) => {
                this.noticiaUpdate = data;
                this.oMatSnackBar.open("User has been updated.", '', { duration: 2000 });
                this.oRouter.navigate(['/gBlog', 'noticia', 'view', this.noticiaUpdate.id]);
              },
              error: (error: HttpErrorResponse) => {
                this.oMatSnackBar.open("Can't update noticia.", '', { duration: 2000 });
              }
            });
          }
          });

    }


  }
}


