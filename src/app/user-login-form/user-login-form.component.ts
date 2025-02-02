
import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { UserRegistrationService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
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



// This is the function responsible for sending the form inputs to the backend
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
     this.dialogRef.close(); // This will close the modal on success!
     this.snackBar.open('login successful!', 'OK', {
        duration: 2000
     });
     console.log('Saved Token:', localStorage.getItem('token'));
     console.log("Username:", localStorage.getItem("username"));
     console.log("User ID:", localStorage.getItem('user'));

     this.router.navigate(['movies']);
    },
    (error) => {
      // Error logs for debugging
      console.error('Error status:', error.status); // Log the HTTP status code
      console.error('Error body:', error.error);    // Log the error body from the server
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
    /*(result) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });*/
}

  
