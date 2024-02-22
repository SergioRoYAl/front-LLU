import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  sUrl: string = API_URL + "/media";

  constructor(
    private oHttpClient: HttpClient,
  ) { }

  getFile(sFile: string): Observable<any>{
    return this.oHttpClient.get(this.sUrl + sFile); // Agregar sFile a la ruta relativa
  }
  
  uploadFile(formData: FormData): Observable<any>{
    return this.oHttpClient.post(this.sUrl + "/upload", formData);
  }

}
