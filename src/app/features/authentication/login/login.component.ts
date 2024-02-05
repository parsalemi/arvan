import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { JsonPipe } from "@angular/common";
import { Router, RouterLink } from "@angular/router";
import { ApiService } from "../../../services/api.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    JsonPipe,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private _api = inject(ApiService);
  router = inject(Router);
  private toastr = inject(ToastrService);
  login = new FormGroup({
    email:new FormControl(null,),
    password:new FormControl(null)
  });

  signIn(){
    this._api.login(this.login.value).subscribe((a:any) => {
      if(a.user.token){
        localStorage.setItem('token',a.user.token);
        localStorage.setItem('username',a.user.username);
        this.router.navigate(['/list']);
        this.toastr.success('Enjoy!','You Logged In Successfully', {
          timeOut: 2000,
          positionClass: 'toast-top-right',
          closeButton: true
        });
        this.toastr.error('Try Again Later', 'Something Went Wrong', {
          timeOut: 5000,
          positionClass: 'toast-top-right',
          closeButton: true
        });
      }
    });
  }
}
