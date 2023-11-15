import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth-service';
import { AppModule } from '../../app.module';
import { LoginModel } from '../../models/login-model';
import { TokenModel } from '../../models/token-model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, AppModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public email: string = '';
  public password: string = '';
  public returnUrl: string;

  constructor(private authService: AuthService, activatedRoute: ActivatedRoute, private router: Router){
    this.returnUrl = activatedRoute.snapshot.queryParams['returnUrl'] || '/';
  }

  public async redirectToReturnUrl(){
    await this.router.navigateByUrl(this.returnUrl);
  }


  public onClick() {
    console.log(this.email);
    console.log(this.password);

    this.authService.login(new LoginModel(this.email, this.password)).subscribe((response: TokenModel) => {
      localStorage.setItem('jwt', response.token);
      this.redirectToReturnUrl();
    });

  }
}
