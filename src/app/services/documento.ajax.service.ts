import { Injectable } from '@angular/core';
import { API_URL } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { IDocumento, IDocumentoPage } from '../model/model.interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentoAjaxService {
  
  sUrl: string = API_URL + "/documento";

  constructor(
    private oHttpClient: HttpClient
  ) { }

  getOne(id: number): Observable<IDocumento>{
    return this.oHttpClient.get<IDocumento>(this.sUrl + "/" + id);
  }

  getPage(size: number | undefined, page: number | undefined, orderField: string, orderDirection: string): 
    Observable<IDocumentoPage>{
      if (!size) size = 10;
      if (!page) page = 0;
      return this.oHttpClient.get<IDocumentoPage>(this.sUrl + "?size=" + size + "&page=" + page + "&sort=" + orderField + "," + orderDirection);
  }

  
  removeOne(id: number | undefined): Observable<number>{
    if(id){
      return this.oHttpClient.delete<number>(this.sUrl + "/" + id);
    } else {
      return new Observable<number>();
    }
  }

  newOne(oDocumento: IDocumento): Observable<IDocumento>{
    return this.oHttpClient.post<IDocumento>(this.sUrl, oDocumento);
  }

  updateOne(oDocumento: IDocumento): Observable<IDocumento>{
    return this.oHttpClient.put<IDocumento>(this.sUrl, oDocumento);
  }

  lastPendiente(id: number): Observable<IDocumento>{
    return this.oHttpClient.get<IDocumento>(this.sUrl + "/pendiente/" + id);
  }

  encargar(oDocumento: IDocumento): Observable<IDocumento>{
    return this.oHttpClient.get<IDocumento>(this.sUrl + "/encargar" + oDocumento);
  }
}
