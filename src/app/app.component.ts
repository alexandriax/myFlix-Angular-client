
import { Component } from '@angular/core';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { MatDialog } from '@angular/material/dialog';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'myFlix-Angular-client';
  isWelcomePage: boolean = false;

  constructor(public dialog: MatDialog, private router: Router) { 
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isWelcomePage = event.url === '/' || event.url === '/welcome'
      }
    })
  }

openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {

    width: '280px'
    });
  }

  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {

    width: '280px'
    });
  }

  openMoviesDialog(): void {
    this.dialog.open(MovieCardComponent, {
      width: '300px'
    });
  }

  logout(): void {
    localStorage.clear(); // Clears stored user data
    this.router.navigate(['/welcome']); // Redirects user to the welcome page
  }
}
