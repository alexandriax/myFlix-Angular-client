
import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  @Input() userData = { username: '', password: '', email: '', birthday: '' };

constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }

ngOnInit(): void {
}


registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
     this.dialogRef.close(); 
     console.log(result);
     this.snackBar.open(result, 'OK', {
        duration: 2000
     });
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }

  }
