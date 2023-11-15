import { HttpClient } from "@angular/common/http";
import { Inject } from "@angular/core";
import { environment } from "../../environments/environment";
import { RegisterModel } from "../models/register-model";
import { Observable } from "rxjs";
import { LoginModel } from "../models/login-model";
import { TokenModel } from "../models/token-model";
import { PagedResult } from "../models/paged-result";
import { UserModel } from "../models/User";

@Inject('root')
export class AuthService{
  constructor(private http: HttpClient){

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

  public login(model: LoginModel): Observable<TokenModel>{
    return this.http.post<TokenModel>(`${environment.backendUri}/api/Auth/login`, model, {
      headers: {
        'Authorization':`Bearer ${localStorage.getItem('jwt')}`
      }
    });
  }

  public getEmployees(page: number, pageSize: number){
    return this.http.get<PagedResult<UserModel>>(`${environment.backendUri}/api/Auth/employees/${page}/${pageSize}`, {
      headers: {
        'Authorization':`Bearer ${localStorage.getItem('jwt')}`
      }
    });
  }
}
