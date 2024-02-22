import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { INoticia, INoticiaPage, INoticiaUpdate } from '../model/model.interfaces';
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
    Observable<INoticiaPage>{
      if (!size) size = 10;
      if (!page) page = 0;
      return this.oHttpClient.get<INoticiaPage>(this.sUrl + "?size=" + size + "&page=" + page + "&sort=" + orderField + "," + orderDirection);
  }
  getPageVisible(size: number | undefined, page: number | undefined, orderField: string, orderDirection: string): 
    Observable<INoticiaPage>{
      if (!size) size = 10;
      if (!page) page = 0;
      return this.oHttpClient.get<INoticiaPage>(this.sUrl + "/visible" + "?size=" + size + "&page=" + page + "&sort=" + orderField + "," + orderDirection);
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

  updateOne(noticia: INoticiaUpdate): Observable<INoticiaUpdate> {
    return this.oHttpClient.put<INoticiaUpdate>(this.sUrl, noticia);
  }

}