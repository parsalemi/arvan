import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn, Validators
} from "@angular/forms";
import { JsonPipe, NgClass, NgIf } from "@angular/common";
import { ApiService } from "../../../services/api.service";
import { Router, RouterLink } from "@angular/router";
import { error } from "@angular/compiler-cli/src/transformers/util";
import { ToastrService } from "ngx-toastr";
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
  private _api = inject(ApiService);
  router = inject(Router);
  private toastr = inject(ToastrService);
  register = new FormGroup({
    email: new FormControl(null, [Validators.email,Validators.required]),
    username: new FormControl(null,[Validators.required]),
    password: new FormControl(null,[Validators.required]),
    confirmPass: new FormControl(null,[Validators.required])
  },
    {validators: [ passwordMatch() ]});


  signUp(){
    const data = this.register.value;
    delete data.confirmPass;
    this._api.userRegister(data).subscribe((a:any) => {
      console.log(a);
      localStorage.setItem('token',a.user.token);
      localStorage.setItem('username',a.user.username);
      localStorage.setItem('password',a.user.password);
      this.router.navigate(['/list']);
      this.toastr.success('Sign Up Successfully', 'Register Done',{
        timeOut: 2000,
        positionClass: 'toast-top-right',
        closeButton: true
      });
      this.toastr.error('Try Again Later', 'Something Went Wrong',{
        timeOut: 5000,
        positionClass: 'toast-top-right',
        closeButton: true
      });
    });
  }
}
