import { Injectable } from '@angular/core';
import { API_URL } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProducto, IProductoPage, IUser } from '../model/model.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductoAjaxService {

  sUrl: string = API_URL + "/productos";

  constructor(
    private oHttpClient: HttpClient
  ) { }

  getOne(id: number): Observable<IProducto>{
    return this.oHttpClient.get<IProducto>(this.sUrl + "/" + id);
  }

  //REALIZAR LA TAREA PARA 
  getPageAdmin(size: number | undefined, page: number | undefined, orderField: string, orderDirection: string): 
    Observable<IProductoPage>{
      if (!size) size = 10;
      if (!page) page = 0;
      return this.oHttpClient.get<IProductoPage>(this.sUrl + "/full" + "?size=" + size + "&page=" + page + "&sort=" + orderField + "," + orderDirection);
  }

  getPage(size: number | undefined, page: number | undefined, orderField: string, orderDirection: string): 
    Observable<IProductoPage>{
      if (!size) size = 10;
      if (!page) page = 0;
      return this.oHttpClient.get<IProductoPage>(this.sUrl + "/visible" + "?size=" + size + "&page=" + page + "&sort=" + orderField + "," + orderDirection);
  }

  removeOne(id: number | undefined): Observable<number>{
    if (id) {
      return this.oHttpClient.delete<number>(this.sUrl + "/" + id);
    } else {
      return new Observable<number>();
    }
  }

  newOne(oProducto: IProducto): Observable<IProducto>{
    return this.oHttpClient.post<IProducto>(this.sUrl, oProducto);
  }

  updateOne(oProducto: IProducto): Observable<IProducto>{
    return this.oHttpClient.put<IProducto>(this.sUrl, oProducto);
  }

}