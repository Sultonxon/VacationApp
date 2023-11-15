import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VacationModel } from '../../models/vacation-model';

@Component({
  selector: 'app-vacation-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vacation-list.component.html',
  styleUrl: './vacation-list.component.css'
})
export class VacationListComponent {

  public vacations: VacationModel[]  = [];
}
