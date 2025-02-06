import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

/**
 * API URL that provides data for the client app.
 */
const apiUrl = 'https://moo-movies-10a7ea08abc9.herokuapp.com';
@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {

  constructor(private http: HttpClient) {
  }
   /**
   * Registers a new user.
   * @param userData - The user's registration details including username, password, email, and birthday.
   * @returns An Observable containing the API response.
   */
  public userRegistration(userData: any): Observable<any> {
    console.log(userData);
    return this.http.post(apiUrl + '/users', userData).pipe(
    catchError(this.handleError)
    );
  }

   /**
   * Authenticates a user and retrieves a JWT token.
   * @param userData - The user's login credentials (username and password).
   * @returns An Observable containing the authentication response.
   */
  public userLogin(userData: any): Observable<any> {
    console.log(userData);
    return this.http.post(apiUrl + '/login',  {
      username: userData.username,
      password: userData.password
    }, {
      headers: new HttpHeaders({
          'Content-type': 'application/json',
      })
    }).pipe(
      map((response: any) => {
        if (response.user && response.user.username) {
          localStorage.setItem('username', response.user.username); 
          localStorage.setItem('user', response.user._id);
        }
        return response;
      }),
      catchError(this.handleError)
    );
}

  
  /**
   * Retrieves all movies from the API.
   * @returns An Observable containing an array of movies.
   */
  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    console.log('Stored Token:', token);
    return this.http.get(apiUrl + '/movies', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json'
        })}).pipe(
          map(this.extractResponseData),
          catchError(this.handleError)
        );
  }

  /**
   * Retrieves a single movie by its ID.
   * @param movieId - The ID of the movie.
   * @returns An Observable containing the movie details.
   */
  public getMovie(movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `/movies/${movieId}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }

  /**
   * Retrieves details about a specific director.
   * @param directorName - The name of the director.
   * @returns An Observable containing director details.
   */
  public getDirector(directorName: string): Observable <any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `/movies/directors/${directorName}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Retrieves movies by genre.
   * @param genreName - The name of the genre.
   * @returns An Observable containing movies of the specified genre.
   */
  public getGenre(genreName: string): Observable <any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `/movies/genres/${genreName}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Retrieves the logged-in user's details.
   * @returns An Observable containing the user details.
   */
  public getUser(): Observable <any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');

    return this.http.get(apiUrl + `/users/${username}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
}

  

   /**
   * Retrieves a user's favorite movies.
   * @param userId - The ID of the user.
   * @returns An Observable containing the user's favorite movies.
   */
  public getFavoriteMovies(userId: string): Observable<any> {
    const token = localStorage.getItem('token');
    console.log(`Fetching favorite movies for user: ${userId}`);
    return this.http.get(apiUrl + `/users/${userId}/movies`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(
      map((response) => {
        console.log("API Response:", response);
        return this.extractResponseData(response);
      }),
      catchError(this.handleError)
    );
}


  /**
   * Adds a movie to the user's list of favorites.
   * @param movieId - The ID of the movie to add.
   * @returns An Observable containing the updated user details.
   */
  public addFavoriteMovie(movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('user');
    return this.http.post(apiUrl + `/users/${userId}/movies/${movieId}`, null, {
      headers: new HttpHeaders({
        Authorization: `Bearer ` + token
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
}

  /**
   * Updates user profile information.
   * @param userData - The updated user details.
   * @returns An Observable containing the updated user details.
   */
  public editUser(userData: any): Observable<any> {
    console.log('Request payload:', userData);
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('user');
    return this.http.put(apiUrl + `/users/${userId}`, userData, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Deletes a user account.
   * @returns An Observable containing the deletion response.
   */
  public deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('user');
    return this.http.delete(apiUrl + `/users/${userId}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Removes a movie from the user's list of favorites.
   * @param movieId - The ID of the movie to remove.
   * @returns An Observable containing the updated user details.
   */
  public removeFavoriteMovie(movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('user');
    return this.http.delete(apiUrl + `/users/movies/${movieId}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ` + token
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
}



private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
    'Something bad happened; please try again later.');
  }

private extractResponseData(res: any): any {
  const body = res;
  return body || {};
}
}
