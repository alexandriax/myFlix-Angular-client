import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

// api url that will provide data for the client app
const apiUrl = 'https://moo-movies-10a7ea08abc9.herokuapp.com';
@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {

  constructor(private http: HttpClient) {
  }
 // api call for the user registration endpoint
  public userRegistration(userData: any): Observable<any> {
    console.log(userData);
    return this.http.post(apiUrl + '/users', userData).pipe(
    catchError(this.handleError)
    );
  }

  // user login
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

  
  //get all movies
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

  //get one movie
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

  //get director
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

  //get genre
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

  //get user
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

  

  //get favorite movies
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


  //add favorite movie
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

  //edit user
  public editUser(userData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('user');
    return this.http.put(apiUrl + `/users/${userId}`, userData, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  //delete user
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

  //remove movie from favorites
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
