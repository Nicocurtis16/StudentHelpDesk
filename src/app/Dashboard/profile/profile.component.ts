import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  admin = {
    username: '',
    email: '',
    password: '',
  };
  profilePictureUrl: string | ArrayBuffer | null = null;

  ngOnInit(): void {
    // Fetch admin details on init
    this.loadAdminDetails();
  }

  loadAdminDetails(): void {
    // TODO: Load admin details from API or service
  }

  onSubmit(): void {
    // TODO: Handle form submission to update admin details
    console.log('Profile updated:', this.admin);
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
