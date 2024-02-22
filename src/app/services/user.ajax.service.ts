import { Injectable } from '@angular/core';
import { API_URL } from '../../environment/environment';
import { inject } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { IUser, IUserPage } from '../model/model.interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAjaxService {

  sUrl: string = API_URL + "/luz";

  constructor(
    private oHttpClient: HttpClient
  ) { }

  getOne(id: number): Observable<IUser>{
    return this.oHttpClient.get<IUser>(this.sUrl + "/" + id);
  }

  getByUsername(username: string): Observable<IUser>{
    return this.oHttpClient.get<IUser>(this.sUrl + "/de/" + username);
  }

  getPage(size: number | undefined, page: number | undefined, orderField: string, orderDirection: string, id_user?: number, strFilter?: string): Observable<IUserPage> {
    let sUrl_filter: string;
    if (!size) size = 10;
    if (!page) page = 0;    
    if (strFilter && strFilter.trim().length > 0) {
        sUrl_filter = `&filter=${strFilter}`;
    } else {
        sUrl_filter = "";
    }
    return this.oHttpClient.get<IUserPage>(this.sUrl + "?size=" + size + "&page=" + page + "&sort=" + orderField + "," + orderDirection + sUrl_filter);
}

  removeOne(id: number | undefined): Observable<number>{
    if (id) {
      return this.oHttpClient.delete<number>(this.sUrl + "/" + id);
    } else {
      return new Observable<number>();
    }
  }

  newOne(oUser: IUser): Observable<IUser>{
    return this.oHttpClient.post<IUser>(this.sUrl, oUser);
  }

  updateOne(oUser: IUser): Observable<IUser>{
    return this.oHttpClient.put<IUser>(this.sUrl, oUser);
  }


}
