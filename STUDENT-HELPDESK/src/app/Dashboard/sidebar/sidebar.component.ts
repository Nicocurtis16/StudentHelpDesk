import { Component } from '@angular/core';
import { AuthService } from '../../auth.service'; // Update the import path according to your project structure
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/']); // Navigate to the login page or another appropriate page
  }
}
