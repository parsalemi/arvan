import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { JsonPipe } from "@angular/common";
import { Router, RouterLink } from "@angular/router";
import { ApiService } from "../../../services/api.service";

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
      }
    });
  }
}
