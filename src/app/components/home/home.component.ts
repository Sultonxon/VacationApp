import { Component, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeListComponent } from '../employee-list/employee-list.component';
import { VacationListComponent } from '../vacation-list/vacation-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, EmployeeListComponent, VacationListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {


  public selectedUserId?: string;

  public selectUser(id: any){
    this.selectedUserId = id;
  }
}
