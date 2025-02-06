import { Component } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent  {
  /**
   * Stores the current user's information.
   */
  user: any = {}; 

  /**
   * Stores new username input for profile update.
   */
  newUsername: string = ''; 
  newEmail: string = ''; 
  newPassword: string = '';

  favoriteMovieIds: string[] = [];
  allMovies: any[] = [];
  favoriteMovies: any[] = [];

  constructor(private userService: UserRegistrationService) {}

  ngOnInit(): void {
    this.getUserData();

    setTimeout(() => {
      this.newUsername = '';
      this.newEmail = '';
      this.newPassword = '';
    }, 0);
}

  /**
   * Fetches user details & fav movies from the API.
   */
getUserData(): void {
  this.userService.getUser().subscribe({
    next: (resp) => {
      console.log('Fetched user:', resp);
      this.user = resp;
      this.favoriteMovieIds = resp.favoriteMovies || [];

      this.getAllMovies();

      this.newUsername = '';
      this.newEmail = '';
      this.newPassword = '';
    },
    error: (err) => {
      console.error('Error fetching user:', err);
    }
  });
}

  /**
   * Fetches all movies from the API.
   */
  getAllMovies(): void {
    this.userService.getAllMovies().subscribe({
      next: (movies) => {
        this.allMovies = movies;
        this.filterFavoriteMovies();
      },
      error: (err) => {
        console.error("Error fetching movies:", err);
      },
    });
  }

  filterFavoriteMovies(): void {
    this.favoriteMovies = this.allMovies.filter(movie => 
      this.favoriteMovieIds.includes(movie._id)
    );
  }

  /**
   * Updates the user's profile with new input values.
   * If an input field is empty, the existing value is retained.
   */
  onSubmit(): void {
    const updatedUser: any = {
        username: this.newUsername.trim() || this.user.username,
        email: this.newEmail.trim() || this.user.email,
    };

    if (this.newPassword.trim()) {
      updatedUser.password = this.newPassword.trim();
    }

    this.userService.editUser(updatedUser).subscribe({
      next: (response) => {
        alert('Profile updated successfully!');
        this.user = response;

        this.newUsername = '';
        this.newEmail = '';
        this.newPassword = ''; 
      },
      error: (err) => {
        console.error('Error updating user:', err);
      }
    });

  }
}



