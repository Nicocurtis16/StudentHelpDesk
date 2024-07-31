import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  isPasswordVisible = false;

  constructor(private authService: AuthService, private router: Router) {}

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  login() {
    this.authService.login(this.username, this.password).subscribe(
      (data) => {
        this.authService.setSession(data);
        this.router.navigate(['/dashmain']);
      },
      (error) => {
        console.error('Error logging in', error);
      }
    );
  }
}
