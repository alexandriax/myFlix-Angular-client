
import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  @Input() userData: any = { username: '', password: '', };

constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) { }

ngOnInit(): void {
}


  /**
   * Authenticates the user by sending login credentials to the API.
   */
loginUser(): void {
  console.log(this.userData)
  ;
    this.fetchApiData.userLogin(this.userData).subscribe((result: any) => {
      console.log(result);
      const userId = localStorage.getItem('user');
      console.log('User ID:', userId);
      
  // save user and token to local storage
  console.log(result.userId)
     localStorage.setItem('user', result.user._id);
     localStorage.setItem('token', result.token);
     console.log("API Login Response:", result);
console.log("Received User Object:", result.user);

if (result.user && result.user.username) {
    localStorage.setItem('username', result.user.username);
} else {
    console.error("No username found in response!");
}
;
     this.dialogRef.close(); 
     this.snackBar.open('login successful!', 'OK', {
        duration: 2000
     });
     console.log('Saved Token:', localStorage.getItem('token'));
     console.log("Username:", localStorage.getItem("username"));
     console.log("User ID:", localStorage.getItem('user'));

     this.router.navigate(['movies']);
    },
    (error) => {
      // debugging
      console.error('Error status:', error.status); // HTTP status code
      console.error('Error body:', error.error);    // error body from the server
      this.snackBar.open(
        error.error.message || 'Login failed. Please try again.', 
        'OK', 
        {
          duration: 2000,
        }
      );
    }
  );
} 

}

  
