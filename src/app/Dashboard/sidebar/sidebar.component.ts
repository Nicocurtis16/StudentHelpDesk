import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service'; // Adjust the path as needed
import { AuthService } from '../../auth.service'; // Adjust the path as needed
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
        this.user = data;
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
