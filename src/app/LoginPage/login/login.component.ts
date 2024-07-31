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
        if (data && data.token) {
          this.authService.setSession(data);
          this.router.navigate(['/dashmain']);
        } else {
          console.error('Login failed: No token returned');
        }
      },
      (error) => {
        console.error('Error logging in', error);
        alert('Login failed: Please check your credentials and try again.');
      }
    );
  }
}
