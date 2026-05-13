import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {

  registerForm: FormGroup;

  constructor(private _fb: FormBuilder, private _userService: UserService, private _dialogRef: MatDialogRef<UserFormComponent>) {
    this.registerForm = this._fb.group({
      department: '',
      name: '',
      mobile: '',
      email: '',
      dob: '',
      gender: '',
      salary: '',
      usercode: '',
      status: '',
    })
  }


  onFormSubmit() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      this._userService.adduser(this.registerForm.value).subscribe((res) => {
        alert("User Added Successfully");
        this._dialogRef.close();

      })
    }
  }

}
