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
  /**
   * List of movies to display, received as an input from the parent component.
   */
    @Input() movies: any[] = []; 

  /**
   * Array of user's favorite movie IDs.
   */
    favoriteMovies: string[] = [];

  /**
   * Creates an instance of MovieCardComponent.
   * @param {UserRegistrationService} fetchApiData - Service for fetching API data.
   * @param {MatDialog} dialog - Angular Material dialog service for opening modals.
   */
    constructor(public fetchApiData: UserRegistrationService, public dialog: MatDialog) {}

    
  
    ngOnInit(): void {
      this.getMovies();
      this.getUserFavorites();
    }

  /**
   * Opens a dialog displaying additional information.
   * @param {string} title - Title of the dialog.
   * @param {string} content - Content of the dialog (genre or synopsis).
   */
    openDialog(title: string, content: string): void {
      this.dialog.open(DialogContentComponent, {
        width: '500px', 
        data: { title, content }
      });
    }
    
  
  
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
  
    isFavorite(movieId: string): boolean {
      return Array.isArray(this.favoriteMovies) && this.favoriteMovies.includes(movieId);
    }
  
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
  
  