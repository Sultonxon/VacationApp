import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { RegisterModel } from "../models/register-model";
import { Observable } from "rxjs";
import { LoginModel } from "../models/login-model";
import { TokenModel } from "../models/token-model";
import { PagedResult } from "../models/paged-result";
import { UserModel } from "../models/User";
import { UserUpdateModel } from "../models/user-update-model";
import { Router } from "@angular/router";

@Injectable()
export class AuthService{
  refreshPassword(model: { id: string; password: string; }) {
    return this.http.post(`${environment.backendUri}/api/Auth/refresh-password`, model, {
      headers: {
        'Authorization':`Bearer ${localStorage.getItem('jwt')}`
      }
    });
  }
  remove(id: string) {
    return this.http.delete(`${environment.backendUri}/api/Auth/delete/${id}`, {
      headers: {
        'Authorization':`Bearer ${localStorage.getItem('jwt')}`
      }
    });
  }
  isLogedIn(): boolean {
    return localStorage.getItem('jwt') !== null;
  }
  logout() {
    localStorage.removeItem('jwt');
    this.router.navigate(['/login']);
  }
  constructor(private http: HttpClient, private router: Router){

  }

  public register(model: RegisterModel): Observable<Object> {
    return this.http.post(`${environment.backendUri}/api/Auth/register`, model, {
      headers: {
        'Authorization':`Bearer ${localStorage.getItem('jwt')}`
      }
    });
  }
  public registerAdmin(model: RegisterModel): Observable<Object> {
    return this.http.post(`${environment.backendUri}/api/Auth/register-admin`, model, {
      headers: {
        'Authorization':`Bearer ${localStorage.getItem('jwt')}`
      }
    });
  }
  public registerManager(model: RegisterModel): Observable<Object> {
    return this.http.post(`${environment.backendUri}/api/Auth/register-manager`, model, {
      headers: {
        'Authorization':`Bearer ${localStorage.getItem('jwt')}`
      }
    });
  }

  public update(model: UserUpdateModel): Observable<Object> {
    return this.http.post(`${environment.backendUri}/api/Auth/update`, model, {
      headers: {
        'Authorization':`Bearer ${localStorage.getItem('jwt')}`
      }
    });
  }

  public refreshToken(){

    this.http.post<TokenModel>(`${environment.backendUri}/api/Auth/refresh-token`,{},  {
      headers: {
        'Authorization':`Bearer ${localStorage.getItem('jwt')}`
      }
    }).subscribe((res)=>{
      this.saveToken(res);
    });
  }

  public login(model: LoginModel): Observable<TokenModel>{
    return this.http.post<TokenModel>(`${environment.backendUri}/api/Auth/login`, model);
  }

  public getEmployees(page: number, pageSize: number){
    return this.http.get<PagedResult<UserModel>>(`${environment.backendUri}/api/Auth/employees/${page}/${pageSize}`, {
      headers: {
        'Authorization':`Bearer ${localStorage.getItem('jwt')}`
      }
    });
  }

  public saveToken(token: TokenModel){
    localStorage.setItem('jwt', token.token);
  }

  public getUserId(){
    if(!this.isLogedIn()){
      return "";
    }
    return this.decodePayload()['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
  }

  public getUserName(){
    if(!this.isLogedIn()){
      return "";
    }
    return this.decodePayload()['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
  }

  public getEmail(){
    if(!this.isLogedIn()){
      return "";
    }
    return this.decodePayload()['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];
  }

  public getRoles(){
    if(!this.isLogedIn()){
      return [];
    }
    let roles = this.decodePayload()['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    if(typeof(roles)===typeof('string')){
      return [roles];
    }else{
      return roles;
    }
  }

  private decodePayload(){
    let payload = this.getPayload();
    if(!payload){
      return "";
    }
    return JSON.parse(atob(payload));
  }

  private getPayload(){
    return localStorage.getItem('jwt')?.split('.')[1]??"";
  }
}
