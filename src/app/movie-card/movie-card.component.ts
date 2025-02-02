import { Component, Input } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service'

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  @Input() movie: any;
  @Input() isFavorite: boolean = false;

  movies: any[] = [];
  constructor(public fetchApiData: UserRegistrationService) {}

  ngOnInit(): void {
    this.getMovies();
  }

 /* getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  } */

    getMovies(): void {
      this.fetchApiData.getAllMovies().subscribe({
        next: (resp: any) => {
          this.movies = resp;
          console.log('Movies:', this.movies);
        },
        error: (err) => {
          console.error('Error fetching movies:', err);
        },
      });
    }
    
    toggleFavorite(movie: any): void {
      console.log("Toggling favorite for movie:", movie);
      console.log("Movie ID:", movie?._id || movie?.id);  // Log movie ID for debugging
  
      if (!movie || !movie._id) {
          console.error("Movie ID is undefined! Cannot favorite movie.");
          return;
      }
  
      const movieId = movie._id; // Ensure correct ID format
  
      if (this.isFavorite) {
          this.fetchApiData.removeFavoriteMovie(movieId).subscribe({
              next: () => {
                  this.isFavorite = false;
                  console.log(`${movieId} removed from favorites`);
              },
              error: (err) => console.error(`Failed to remove ${movieId}:`, err),
          });
      } else {
          this.fetchApiData.addFavoriteMovie(movieId).subscribe({
              next: () => {
                  this.isFavorite = true;
                  console.log(`${movieId} added to favorites`);
              },
              error: (err) => console.error(`Failed to add ${movieId}:`, err),
          });
      }
  }
  

  /*toggleFavorite(movieId: any): void {
    console.log(movieId)
    if (this.isFavorite) {
      this.fetchApiData.removeFavoriteMovie(movieId).subscribe({
        next: () => {
          this.isFavorite = false;
          console.log(`${movieId} removed from favorites`);
        },
        error: (err) => console.error(`Failed to remove ${movieId}:`, err),
      });
    } else {
      this.fetchApiData.addFavoriteMovie(movieId).subscribe({
        next: () => {
          this.isFavorite = true;
          console.log(`${movieId} added to favorites`);
        },
        error: (err) => console.error(`Failed to add ${movieId}:`, err),
      });
    }
  }*/
  

}
