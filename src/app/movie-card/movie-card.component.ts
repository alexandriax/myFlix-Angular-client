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
  
  