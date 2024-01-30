import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { INoticia } from '../model/model.interfaces';
import { API_URL } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class NoticiaAjaxService {

  sUrl: string = API_URL + "/noticia";

  constructor(
    private oHttpClient: HttpClient
  ) { }

  getOne(id: number): Observable<INoticia>{
    return this.oHttpClient.get<INoticia>(this.sUrl + "/" + id);
  }

  getPage(size: number | undefined, page: number | undefined, orderField: string, orderDirection: string): 
    Observable<INoticia>{
      if (!size) size = 10;
      if (!page) page = 0;
      return this.oHttpClient.get<INoticia>(this.sUrl + "?size=" + size + "&page=" + page + "&sort=" + orderField + "," + orderDirection);
  }

  removeOne(id: number | undefined): Observable<number>{
    if (id) {
      return this.oHttpClient.delete<number>(this.sUrl + "/" + id);
    } else {
      return new Observable<number>();
    }
  }

  newOne(oNoticia: INoticia): Observable<INoticia>{
    return this.oHttpClient.post<INoticia>(this.sUrl, oNoticia);
  }

  updateOne(oNoticia: INoticia): Observable<INoticia>{
    return this.oHttpClient.put<INoticia>(this.sUrl, oNoticia);
  }

}