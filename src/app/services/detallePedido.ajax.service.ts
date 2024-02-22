import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDetallePedido, IDetallePedidoPage } from '../model/model.interfaces';
import { Observable } from 'rxjs';
import { API_URL } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class DetallePedidoAjaxService {

  sUrl: string = API_URL + "/detallePedido";

  constructor(
    private oHttpClient: HttpClient
  ) { }

  getOne(id: number): Observable<IDetallePedido>{
    return this.oHttpClient.get<IDetallePedido>(this.sUrl + "/" + id);
  }

  getPage(size: number | undefined, page: number | undefined, orderField: string, orderDirection: string): 
    Observable<IDetallePedidoPage>{
      
      return this.oHttpClient.get<IDetallePedidoPage>(this.sUrl + "?size=" + size + "&page=" + page + "&sort=" + orderField + "," + orderDirection);
  }

  getPageByDocumentoId(size: number | undefined, page: number | undefined, orderField: string, orderDirection: string, id_documento: number):
    Observable<IDetallePedidoPage>{
      if (!size) size = 10;
      if (!page) page = 0;

      return this.oHttpClient.get<IDetallePedidoPage>(this.sUrl + "/byDocumento/" + id_documento + "?size=" + size + "&page=" + page + "&sort=" + orderField + "," + orderDirection )
    }


  removeOne(id: number | undefined): Observable<number>{
    if(id){
      return this.oHttpClient.delete<number>(this.sUrl + "/" + id);
    } else {
      return new Observable<number>();
    }
  }

  newOne(oDetallePedido: IDetallePedido): Observable<IDetallePedido>{
    return this.oHttpClient.post<IDetallePedido>(this.sUrl, oDetallePedido);
  }

  updateOne(oDetallePedido: IDetallePedido): Observable<IDetallePedido>{
    return this.oHttpClient.put<IDetallePedido>(this.sUrl, oDetallePedido);
  }

  getByDocumentoId(id_documento: number): Observable<IDetallePedidoPage>{
    return this.oHttpClient.get<IDetallePedidoPage>(this.sUrl + "/byDocumento/" + id_documento);
  }

  getByDocumentoIdAndProductId(id_documento: number, id_producto: number ): Observable<IDetallePedido>{
    return this.oHttpClient.get<IDetallePedido>(this.sUrl + "/byDocumento/" + id_documento + "/byProducto/" + id_producto);
  }

}
