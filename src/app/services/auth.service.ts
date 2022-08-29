import { API_CONFIG } from './../config/api.config';
import { Credencias } from './../models/credencias';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtService: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient) { }


  authenticate(creds: Credencias){
    return this.http.post('${API_CONFIG}',creds,{
      observe: 'response',
      responseType: 'text'
    })
  }

  successgullLogin(authToken: string){
    localStorage.setItem('token', authToken);
  }

  isAuthenticated(): boolean {
    let token = localStorage.getItem('token')
    if(token != null){
      return !this.jwtService.isTokenExpired(token);
    }

    return false;
  }

  logout(){
    localStorage.clear();
  }



}
