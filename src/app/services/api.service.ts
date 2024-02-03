import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http:HttpClient,) { }
  baseUrl = 'https://api.realworld.io/api'
  getArticle(offset:number){
    return this._http.get(this.baseUrl + `/articles?limit=10&offset=${offset}`);
  }

  userRegister(data:any){
    return this._http.post(this.baseUrl + '/users',{user:data});
  }

  login(data:any){
    return this._http.post(this.baseUrl + '/users/login',{user:data});
  }
  addArticle(data:any){
    return this._http.post(this.baseUrl + '/articles',{article:data});
  }
  editArticle(data:any, slug:string){
    return this._http.put(this.baseUrl + `/articles/${slug}`,{article:data});
  }
  deleteArticle(slug:string){
    return this._http.delete(this.baseUrl + `/articles/${slug}`);
  }
}
