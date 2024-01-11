import { EventEmitter, Injectable } from '@angular/core';
import { API_URL } from '../../environment/environment';
import { Observable, Subject } from 'rxjs';
import { IToken, IUser, SessionEvent } from '../model/model.interfaces';
import { HttpClient } from '@angular/common/http';
import { UserAjaxService } from './user.ajax.service';

@Injectable({
  providedIn: 'root'
})
export class SessionAjaxService {

    sUrl: string = API_URL + "/sesion";
    loggedIn: boolean = false;
    loginSuccessEvent = new EventEmitter<void>();
    subjectSession = new Subject<SessionEvent>();
  
    constructor(
      private oHttpClient: HttpClient,
      private oUserAjaxService: UserAjaxService
    ) { }

    private parseJwt(token: string): IToken {
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(jsonPayload);
  }

  login(sUsername: string, sPassword: string): Observable<string>{
    return this.oHttpClient.post<string>(this.sUrl, { username: sUsername, password: sPassword });
  }

  setToken(token: string): void{
    return localStorage.setItem("token", token);
  }

  getToken(): string | null{
    return localStorage.getItem("token");
  }

  logout(): void{
    localStorage.removeItem("token");
  }

  isSessionActive(): Boolean{
    let strToken: string | null = this.getToken();
    if(strToken){
      let oDecodedToken: IToken = this.parseJwt(strToken);
      if(Date.now() >= oDecodedToken.exp * 1000){
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  setLoggedIn(value: boolean): void {
    this.loggedIn = value;
    if (value) {
      this.loginSuccessEvent.emit();
    }
  }

  getUsername(): string {
    if(this.isSessionActive()) {
      let token: string | null = localStorage.getItem("token");
      if(!token) {
        return "";
      } else {
        return this.parseJwt(token).name;
      }
    } else {
        return "";
    }
  }

  on(): Observable<SessionEvent>{
    return this.subjectSession.asObservable();
  }

  emit(event: SessionEvent){
    this.subjectSession.next(event);
  }

  getSessionUser(): Observable<IUser> | null {
    if (this.isSessionActive()) {
        return this.oUserAjaxService.getByUsername(this.getUsername())
    } else {
        return null;
    }
}

}
