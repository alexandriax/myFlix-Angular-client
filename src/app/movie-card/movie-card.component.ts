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

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }
  

  toggleFavorite(movieId: any): void {
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
  }
  

}
