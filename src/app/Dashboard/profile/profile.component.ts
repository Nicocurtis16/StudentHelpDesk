import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { User } from '../../user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  admin: User = {
    id: 0,
    Username: '',
    Email: '',
    password: '',
  };
  profilePictureUrl: string | ArrayBuffer | null = null;
  oldPassword: string = '';
  newPassword: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadAdminDetails();
  }

  loadAdminDetails(): void {
    this.userService.getUser().subscribe(
      (user: User) => {
        this.admin = user;
      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );
  }

  onSubmit(): void {
    // Prepare data for submission
    const updateData = {
      ...this.admin,
      oldPassword: this.oldPassword,
      newPassword: this.newPassword,
    };

    this.userService.updateUser(updateData).subscribe(
      (response) => {
        console.log('Profile updated:', response);
      },
      (error) => {
        console.error('Error updating profile:', error);
      }
    );
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        this.profilePictureUrl = reader.result;
      };
      reader.readAsDataURL(input.files[0]);
    }
  }
}
