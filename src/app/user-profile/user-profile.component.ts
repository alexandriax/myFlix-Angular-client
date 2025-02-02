import { Component } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { NgModule } from '@angular/core';
import { MovieCardComponent } from '../movie-card/movie-card.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {
  user: any = {}; //store user info
  favoriteMovies: any[] = []; //stores user's fav movies

  constructor(private userService: UserRegistrationService) {}

  ngOnInit(): void {
    console.log("🔹 LocalStorage Username:", localStorage.getItem('username'));
    console.log("🔹 LocalStorage UserID:", localStorage.getItem('user'));
    this.getUserData();
    //this.getFavoriteMovies();
  }

  getUserData(): void {
    this.userService.getUser().subscribe({
      next: (resp) => {
        console.log('fetched user:', resp);
        this.user = resp;
        //this.favoriteMovies = resp.favoriteMovies || [];
        if (this.user.username) {
          console.log('Username:', this.user.username);
          this.getFavoriteMovies(this.user._id);
        } else {
          console.error('User is missing:', resp);
        }
      },
      error: (err) => {
        console.error('Error fetching user:', err);
      }
    });
  }

  getFavoriteMovies(userId: string): void {
    this.userService.getFavoriteMovies(userId).subscribe((response) => {
      this.favoriteMovies = response;
    });
  }

  

  onSubmit(): void {
    this.userService.editUser(this.user).subscribe((response) => {
      alert('profile updated successfully!');
      this.user = response;
    });
  }

  removeFavoriteMovie(movieId: string): void {
    this.userService.removeFavoriteMovie(movieId).subscribe(() => {
      this.favoriteMovies = this.favoriteMovies.filter((movie) => movie.id !== movieId);
    });
  }

}
