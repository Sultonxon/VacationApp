import { HttpClient } from "@angular/common/http";
import { VacationCreateModel } from "../models/vacation-create-model";
import { environment } from "../../environments/environment";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PagedResult } from "../models/paged-result";
import { VacationModel } from "../models/vacation-model";

@Injectable()
export class VacationService{
  constructor(public http: HttpClient){

  }

  public create(model: VacationCreateModel){
    return this.http.post(`${environment.backendUri}/api/Vacation/create`, model, {
      headers: {
        'Authorization':`Bearer ${localStorage.getItem('jwt')}`
      }
    })
  }

  public approve(id: string){
    return this.http.post(`${environment.backendUri}/api/Vacation/approve/${id}`, {}, {
      headers: {
        'Authorization':`Bearer ${localStorage.getItem('jwt')}`
      }
    })
  }

  public reject(id: string, comment: string){
    return this.http.post(`${environment.backendUri}/api/Vacation/reject`, {
      id: id,
      comment: comment
    }, {
      headers: {
        'Authorization':`Bearer ${localStorage.getItem('jwt')}`
      }
    })
  }

  public delete(id: string){
    return this.http.delete(`${environment.backendUri}/api/Vacation/delete/${id}`, {
      headers: {
        'Authorization':`Bearer ${localStorage.getItem('jwt')}`
      }
    })
  }

  public getApailableDays(): Observable<{AvailableDays: number}>{
    return this.http.get<{AvailableDays:number}>(`${environment.backendUri}/api/Vacation/available`, {
      headers: {
        'Authorization':`Bearer ${localStorage.getItem('jwt')}`
      }
    })
  }

  public getAll(page: number, pageSize: number){
    return this.http.get<PagedResult<VacationModel>>(
      `${environment.backendUri}/api/Vacation/all?page=${page}&pageSize=${pageSize}`,
      {
        headers: {
          'Authorization':`Bearer ${localStorage.getItem('jwt')}`
        }
      })
  }

  public getByUser(page: number, pageSize: number){

    return this.http.get<PagedResult<VacationModel>>(
      `${environment.backendUri}/api/Vacation/user?page=${page}&pageSize=${pageSize}`,
      {
        headers: {
          'Authorization':`Bearer ${localStorage.getItem('jwt')}`
        }
      })
  }


  public getByUserId(page: number, pageSize: number, userId: string){

    return this.http.get<PagedResult<VacationModel>>(
      `${environment.backendUri}/api/Vacation/users/${userId}/${page}/${pageSize}`,
      {
        headers: {
          'Authorization':`Bearer ${localStorage.getItem('jwt')}`
        }
      })
  }
}
