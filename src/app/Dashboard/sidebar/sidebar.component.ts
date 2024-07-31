import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service'; // Update the path accordingly
import { AuthService } from '../../auth.service'; // Update the path accordingly
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  user: any = {};

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.getUser().subscribe(
      (data) => {
        console.log('User data fetched:', data); // Log the entire response
        this.user = data;

        // Log the specific properties
        console.log('Username:', data.Username);
        console.log('Email:', data.Email);
      },
      (error) => {
        console.error('Error fetching user data', error);
      }
    );
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']); // Navigate to the login page or another appropriate page
  }
}
