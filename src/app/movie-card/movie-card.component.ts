import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';
import { DialogContentComponent } from '../dialog-content/dialog-content.component';
  
  @Component({
    selector: 'app-movie-card',
    templateUrl: './movie-card.component.html',
    styleUrls: ['./movie-card.component.scss']
  })
  export class MovieCardComponent implements OnInit {
    @Input() movies: any[] = []; 
    favoriteMovies: string[] = [];
  
    constructor(public fetchApiData: UserRegistrationService, public dialog: MatDialog) {}

    
  
    ngOnInit(): void {
      this.getMovies();
      this.getUserFavorites();
    }

    openDialog(title: string, content: string): void {
      this.dialog.open(DialogContentComponent, {
        width: '500px', 
        data: { title, content }
      });
    }
    
  
  /**
   * Fetches all movies from the API and updates the movie list.
   */
    getMovies(): void {
      this.fetchApiData.getAllMovies().subscribe({
        next: (movies: any) => {
          this.movies = movies;
        },
        error: (err) => {
          console.error("error getting movies:", err);
        },
      });
    }

  /**
   * Fetches the user's favorite movies from the API.
   */
    getUserFavorites(): void {
      this.fetchApiData.getUser().subscribe({
        next: (user) => {
          this.favoriteMovies = user.favoriteMovies || [];
        },
        error: (err) => {
          console.error("error getting user favorites:", err);
        },
      });
    }

  /**
   * Checks if a movie is in the user's list of favorites.
   * @param movieId - The ID of the movie.
   * @returns True if the movie is a favorite, otherwise false.
   */
    isFavorite(movieId: string): boolean {
      return Array.isArray(this.favoriteMovies) && this.favoriteMovies.includes(movieId);
    }
    
  /**
   * Adds or removes a movie from the user's list of favorites.
   * @param movie - The movie object.
   */
    toggleFavorite(movie: any): void {
      if (!movie || !movie._id) {
        console.error("movie ID is undefined");
        return;
      }
  
      const movieId = movie._id;
  
      if (this.isFavorite(movieId)) {
        this.fetchApiData.removeFavoriteMovie(movieId).subscribe({
          next: (updatedUser) => {
            this.favoriteMovies = updatedUser.favoriteMovies || [];
          },
          error: (err) => console.error(`failed to remove ${movieId}:`, err),
        });
      } else {
        this.fetchApiData.addFavoriteMovie(movieId).subscribe({
          next: (updatedUser) => {
            this.favoriteMovies = updatedUser.favoriteMovies || [];
          },
          error: (err) => console.error(`failed to add ${movieId}:`, err),
        });
      }
    }
  }
  
  