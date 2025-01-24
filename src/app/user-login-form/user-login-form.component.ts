
import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { UserRegistrationService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  @Input() userData: any = { Username: '', Password: '', };

constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar) { }

ngOnInit(): void {
}



// This is the function responsible for sending the form inputs to the backend
loginUser(): void {
  console.log(this.userData)
    this.fetchApiData.userLogin(this.userData).subscribe((result: any) => {
  // save user and token to local storage
     localStorage.setItem('currentUser', JSON.stringify(result.user));
     localStorage.setItem('token', result.token);
     this.dialogRef.close(); // This will close the modal on success!
     this.snackBar.open('login successful!', 'OK', {
        duration: 2000
     });
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

  
