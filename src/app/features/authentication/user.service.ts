import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { UserDTO, UserLogin } from '../../core/models/user.model';
import { User } from "../../core/models/user.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = 'https://api.realworld.io/api'
  constructor(private _http : HttpClient) { }

  userRegister(data: User): Observable<UserDTO>{
    return this._http.post<UserDTO>(this.baseUrl + '/users', {user: data})
  }

  userLogin(data: UserLogin): Observable<UserDTO>{
    return this._http.post<UserDTO>(this.baseUrl + '/users/login',{user:data});
  }
}
