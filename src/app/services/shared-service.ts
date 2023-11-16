import { Injectable } from "@angular/core";
import Swal, { SweetAlertIcon } from "sweetalert2";

@Injectable()
export class SharedService{

  public toastError(message: string){
    this.toasInternal(message, "error");
  }

  public toastSuccess(message: string){
    this.toasInternal(message, "success");
  }

  private toasInternal(message: string, type: SweetAlertIcon){
    const Toast:any = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 5000,
      icon:type
    })
    Toast.fire({
        type: type,
        title: message
    });
  }
}

