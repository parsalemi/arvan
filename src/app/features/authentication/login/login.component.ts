import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { JsonPipe, NgIf } from "@angular/common";
import { Router, RouterLink } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { UserService } from "../user.service";
import { User, UserDTO, UserLogin } from "../../../core/models/user.model"
import { of, switchMap, tap } from "rxjs";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    JsonPipe,
    RouterLink,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private _userService = inject(UserService);
  private _toastr = inject(ToastrService);
  router = inject(Router);
  loading = false;

  loginForm = new FormGroup({
    email: new FormControl(""),
    password: new FormControl("")
  });

  loginUser() {
    const body: UserLogin = {
      email: this.loginForm.value.email as string,
      password: this.loginForm.value.password as string
    }
    this._userService.userLogin(body).subscribe({
        next: (data: UserDTO) => {
          if (data.user.token) {
            localStorage.setItem('token', data.user.token);
            localStorage.setItem('username', data.user.username);
            this.router.navigate(['/list']);
          }
          this.loading = false;
          this._toastr.success('Enjoy!', 'You Logged In Successfully', {
            timeOut: 2000,
            positionClass: 'toast-top-right',
            closeButton: true
          });
        },
        error: () => {
          this.loading = false;
          this._toastr.error('Try Again Later', 'Something Went Wrong', {
            timeOut: 5000,
            positionClass: 'toast-top-right',
            closeButton: true
          })
        }
      })
  }

  load() {
    // this.loading = true;
  }

}
