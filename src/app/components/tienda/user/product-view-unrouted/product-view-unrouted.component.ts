import { Component, Input, OnInit, Optional } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { config } from 'rxjs';
import { ProductoAjaxService } from '../../../../services/producto.ajax.service';
import { IDetallePedido, IDocumento, IProducto, IUser } from '../../../../model/model.interfaces';
import { HttpErrorResponse } from '@angular/common/http';
import { SessionAjaxService } from '../../../../services/session.ajax.service';
import { DocumentoAjaxService } from '../../../../services/documento.ajax.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DetallePedidoAjaxService } from '../../../../services/detallePedido.ajax.service';
import { API_URL } from '../../../../../environment/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-view-unrouted',
  templateUrl: './product-view-unrouted.component.html',
  styleUrls: ['./product-view-unrouted.component.css']
})
export class ProductViewUnroutedComponent implements OnInit {

  sUrl: string = API_URL;
  documentoForm!: FormGroup;
  product: IProducto = {} as IProducto;
  documento: IDocumento = { usuario: {} } as IDocumento;
  documentoPendiente: IDocumento = { usuario: {} } as IDocumento;
  @Input() id: number = 0;
  oSessionUser: IUser = {} as IUser;
  status: HttpErrorResponse | null = null;
  actualizado: boolean = false;
  imageSrc: string = '';

  detallePedidoVacio: IDetallePedido = { documento: { }, producto: { } } as IDetallePedido;
  detallePedidoCrear: IDetallePedido = { documento: { }, producto: { } } as IDetallePedido;
  detallePedidoCreado: IDetallePedido = { documento: { }, producto: { } } as IDetallePedido;
  detallePedidoExistente: IDetallePedido = { documento: { }, producto: { } } as IDetallePedido;
  detallePedidoActualizado: IDetallePedido = { documento: { }, producto: { } } as IDetallePedido;
  detallePedidoAActualizar: IDetallePedido = { documento: { }, producto: { } } as IDetallePedido;


  constructor(
    private oProductAjaxService: ProductoAjaxService,
    private oDocumentoAjaxService: DocumentoAjaxService,
    @Optional() public config: DynamicDialogConfig,
    private oSessionService: SessionAjaxService,
    private oFormBuilder: FormBuilder,
    private oDetallePedidoService: DetallePedidoAjaxService,
    private oMatSnackBar: MatSnackBar
  ) {
    if (config) {
      if (config.data) {
        this.id = config.data.id;
      }
    }
    
  }

  ngOnInit() {
    this.getOne();
    this.getUser();
  }

  getUser(): void {
    this.oSessionService.getSessionUser()?.subscribe({
      next: (data: IUser) => {
        this.oSessionUser = data;
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    })
  }

  getOne(): void {

    this.oProductAjaxService.getOne(this.id).subscribe({
      next: (data: IProducto) => {
        this.product = data;
        this.imageSrc = API_URL + "/media/" + this.product.foto;
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }

    })
  }

  createPedido() {

    this.documentoForm = this.oFormBuilder.group({
      id: 0,
      usuario: { id: this.oSessionUser.id },
      fecha_pedido: null,
    })

    if (this.oSessionUser) {
      this.oDocumentoAjaxService.lastPendiente(this.oSessionUser.id)
        .subscribe({
          next: (data: IDocumento) => {
            this.documento = data;
            if (this.documento != null) {
              console.log("Ya hay un pedido pendiente")
              //AÑADIR UN PRODUCTO AL PEDIDO (DETALLE PEDIDO ASOCIADO AL PEDIDO)
              this.oDetallePedidoService.getByDocumentoIdAndProductId(this.documento.id, this.product.id)
                .subscribe({
                  next: (data: IDetallePedido) => {
                    
                    this.detallePedidoExistente = data;

                    if (this.detallePedidoExistente != null){
                      this.detallePedidoAActualizar.id = this.detallePedidoExistente.id;
                      this.detallePedidoAActualizar.cantidad = this.detallePedidoExistente.cantidad + 1;
                      this.detallePedidoAActualizar.documento.id = this.documento.id;
                      this.detallePedidoAActualizar.producto.id = this.product.id;
                      this.detallePedidoAActualizar.cantidad = this.detallePedidoExistente.cantidad + 1;
                      this.detallePedidoAActualizar.precio = this.product.precio + this.detallePedidoExistente.precio;
                      
                      this.oDetallePedidoService.updateOne(this.detallePedidoAActualizar)
                        .subscribe({
                          next: (data: IDetallePedido) => {
                            this.detallePedidoActualizado = data;
                            console.log(data);
                          },
                          error: (error: HttpErrorResponse) => {
                            this.status = error;
                          }
                        });
                    } else {
                      this.detallePedidoCrear.documento.id = this.documento.id;
                      this.detallePedidoCrear.producto.id = this.product.id;
                      this.detallePedidoCrear.cantidad = 1;
                      this.detallePedidoCrear.precio = this.product.precio;
                      this.oDetallePedidoService.newOne(this.detallePedidoCrear)
                        .subscribe({
                          next: (data: IDetallePedido) => {
                            this.detallePedidoCreado = data;
                            this.oMatSnackBar.open("Producto añadido al carrito.", '', { duration: 2000 });   
                          
                            console.log(data);

                          },
                          error: (error: HttpErrorResponse) => {
                            this.status = error;
                          }
                        });
                    }
                    this.oMatSnackBar.open("Producto añadido al carrito.", '', { duration: 2000 });   
                          
                        
                      
                  },
                  error: (error: HttpErrorResponse) => {
                      
                    
                  }
                });
                
              



            } else {
              //CREA EL DOCUMENTO DE PEDIDO
              this.oDocumentoAjaxService.newOne(this.documentoForm.value)
                .subscribe({
                  next: (data: IDocumento) => {
                    this.documentoPendiente = data;

                    this.detallePedidoCrear.cantidad = 1;
                    this.detallePedidoCrear.precio = this.product.precio;
                    this.detallePedidoCrear.documento.id = this.documentoPendiente.id;
                    this.detallePedidoCrear.producto.id = this.product.id;
                    this.oDetallePedidoService.newOne(this.detallePedidoCrear)
                      .subscribe({
                        next: (data: IDetallePedido) => {
                          this.detallePedidoCreado = data;
                          this.oMatSnackBar.open("Producto añadido al carrito.", '', { duration: 2000 });   
                          console.log(data);
                        },
                        error: (error: HttpErrorResponse) => {
                          this.status = error;
                            }
                      
                      });
                    console.log(data);
                  },
                  error: (error: HttpErrorResponse) => {
                    this.status = error;
                     
                  }
                })
              //AÑADIR DICHO PRODUCTO AL PEDIDO

            }
          },
          error: (error: HttpErrorResponse) => {
            this.status = error;
            this.oMatSnackBar.open("Producto no añadido, inicia sesion.", '', { duration: 2000 });
                     
          }
        });

    }
    this.actualizado = false;
    
  }


}
