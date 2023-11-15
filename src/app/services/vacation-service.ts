import { HttpClient } from "@angular/common/http";
import { VacationCreateModel } from "../models/vacation-create-model";
import { environment } from "../../environments/environment";
import { Inject } from "@angular/core";

@Inject('root')
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

}
