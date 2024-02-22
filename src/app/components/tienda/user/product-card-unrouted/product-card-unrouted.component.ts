import { Component, Input, OnInit } from '@angular/core';
import { IProducto } from '../../../../model/model.interfaces';
import { MediaService } from '../../../../services/media.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { GestionBlogDetailUnroutedComponent } from '../../../blog/admin/gestion-blog-detail-unrouted/gestion-blog-detail-unrouted.component';
import { ProductViewUnroutedComponent } from '../product-view-unrouted/product-view-unrouted.component';
import { API_URL } from '../../../../../environment/environment';

@Component({
  selector: 'app-product-card-unrouted',
  templateUrl: './product-card-unrouted.component.html',
  styleUrls: ['./product-card-unrouted.component.css']
})
export class ProductCardUnroutedComponent implements OnInit {

  @Input() product!: IProducto;
  //getters y setters

  sURL: string = API_URL;

  ref: DynamicDialogRef | undefined;
  imageSrc: string = '';


  constructor(
    private oMediaService: MediaService,
    private oDialogService: DialogService
  ) { }

  ngOnInit() {
    this.imageSrc = this.sURL + "/media/" + this.product.foto;
  }


  doView(p: IProducto) {
    this.ref = this.oDialogService.open(ProductViewUnroutedComponent, {
      data: {
        id: p.id
      },
      header: p.nombre,
      width: "50%",
      contentStyle: { overflow: "auto" },
      baseZIndex: 10000,
      maximizable: false
    });
  }

}
