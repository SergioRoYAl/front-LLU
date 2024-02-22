import { Injectable } from '@angular/core';
import { API_URL } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { IRespuesta, IRespuestaPage, IUserPage } from '../model/model.interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RespuestaAjaxService {

  sUrl: string = API_URL + "/respuesta";

  constructor(
    private oHttpClient: HttpClient
  ) { }

  getOne(id: number): Observable<IRespuesta>{
    return this.oHttpClient.get<IRespuesta>(this.sUrl + "/" + id);
  }

  getPage(size: number | undefined, page: number | undefined, orderField: string, orderDirection: string): 
    Observable<IRespuestaPage>{
      if (!size) size = 10;
      if (!page) page = 0;
      return this.oHttpClient.get<IRespuestaPage>(this.sUrl + "?size=" + size + "&page=" + page + "&sort=" + orderField + "," + orderDirection);
  }

  removeOne(id: number | undefined): Observable<number>{
    if(id){
      return this.oHttpClient.delete<number>(this.sUrl + "/" + id);
    } else {
      return new Observable<number>();
    }
  }

  newOne(oRespuesta: IRespuesta): Observable<IRespuesta>{
    return this.oHttpClient.post<IRespuesta>(this.sUrl, oRespuesta);
  }

  updateOne(oRespuesta: IRespuesta): Observable<IRespuesta>{
    return this.oHttpClient.put<IRespuesta>(this.sUrl, oRespuesta);
  }
}
