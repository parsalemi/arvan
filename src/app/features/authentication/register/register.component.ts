import { Component, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn, Validators
} from "@angular/forms";
import { JsonPipe, NgClass, NgIf } from "@angular/common";
import { Router, RouterLink } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { UserService } from "../user.service";
import { User, UserDTO } from "../../../core/models/user.model";
import { map, switchMap, tap } from "rxjs";
function passwordMatch(): ValidatorFn{
  return (abstractControl : AbstractControl) => {
    const password = abstractControl.get('password') as AbstractControl<string>;
    const confirmPass = abstractControl.get('confirmPass') as AbstractControl<string>;
    if(password.value === confirmPass.value){
      return null;
    }else{
      const error = { 'Password not match': true };
      confirmPass.setErrors(error);
      return error;
    }
  }
}
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    JsonPipe,
    NgIf,
    NgClass,
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private _api = inject(UserService);
  private _toastr = inject(ToastrService);
  router = inject(Router);
  loading = false;

  register = new FormGroup({
    email: new FormControl("", [Validators.email,Validators.required]),
    username: new FormControl("",[Validators.required]),
    password: new FormControl("",[Validators.required]),
    confirmPass: new FormControl("",[Validators.required])
  }, {validators: [ passwordMatch() ]}
  );

  signUp(){
    const data: User = {
      email: this.register.value.email as string,
      username: this.register.value.username as string,
      password: this.register.value.password as string
    };
    this._api.userRegister(data).subscribe(
      { next: (a)  => {
        console.log(a);
        this.loading= false;
        localStorage.setItem('token', a.user.token);
        localStorage.setItem('username', a.user.username);
        this.router.navigate(['/articles']);
        this._toastr.success('Sign Up Successfully', 'Register Done', {
          timeOut: 2000,
          positionClass: 'toast-top-right',
          closeButton: true
        });
      }, error: () => {
        this.loading = false;
        this._toastr.error('Try Again Later', 'Something Went Wrong',{
          timeOut: 5000,
          positionClass: 'toast-top-right',
          closeButton: true
        });
      }
    });
  }

  load(){
    this.loading = true;
  }
}
