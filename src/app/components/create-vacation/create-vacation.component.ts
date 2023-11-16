import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VacationCreateModel } from '../../models/vacation-create-model';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {DateAdapter, MatNativeDateModule} from '@angular/material/core';
import { VacationService } from '../../services/vacation-service';
import { SharedService } from '../../services/shared-service';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-create-vacation',
  standalone: true,
  imports: [CommonModule, MatDatepickerModule, MatInputModule, FormsModule,
    ReactiveFormsModule,MatNativeDateModule, RouterModule],
  templateUrl: './create-vacation.component.html',
  styleUrl: './create-vacation.component.css'
})
export class CreateVacationComponent {

  constructor(private vacationService: VacationService, private sharedService: SharedService,
    private router: Router) { }

  public today = new Date();
  public month = this.today.getMonth();
  public year = this.today.getFullYear();

  campaignOne = new FormGroup({
    start: new FormControl(new Date(this.year, this.month, this.today.getDay())),
    end: new FormControl(new Date(this.year, this.month, this.today.getDay())),
  });
  public reason?: string;
  // campaignTwo = new FormGroup({
  //   start: new FormControl(new Date(year, month, 15)),
  //   end: new FormControl(new Date(year, month, 19)),
  // });

  createVacation() {
    if(this.campaignOne.value.start && this.campaignOne.value.end && this.reason){
      var vacation = new VacationCreateModel(this.campaignOne.value.start, this.campaignOne.value.end, this.reason);
      console.log(vacation);
      this.vacationService.create(vacation).subscribe(
        (res) => {
          console.log(res);
          this.sharedService.toastSuccess("Vacation created successfully");
          this.router.navigateByUrl('/');
        },
        (err) => {
          console.log(err);
          this.sharedService.toastError("Vacation creation failed");
        }
      );
    }
    else{
      this.sharedService.toastError("Please fill all fields");
    }
  }
}
