import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth-service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VacationService } from './services/vacation-service';
import { SharedService } from './services/shared-service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule
  ],
  providers: [AuthService, VacationService, SharedService]
})
export class AppModule { }
