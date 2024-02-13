import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { Article, ArticleAdd, ArticleDTO } from "../../core/models/article.model";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private _http : HttpClient) { }
  baseUrl = 'https://api.realworld.io/api';

  convertArticleDTOtoArticle<A>(res:ArticleDto<A>): A[]{
    return res.articles
  }

  getArticle(offset:number) : Observable<Article[]>{
    return this._http.get<ArticleDTO>(this.baseUrl + `/articles?limit=10&offset=${offset}`).pipe(map(
      res => this.convertArticleDTOtoArticle(res)
    ));
  }
  addArticle(data:any) : Observable<void>{
    return this._http.post<void>(this.baseUrl + '/articles',{article:data});
  }
  editArticle(data:any, slug:string): Observable<void>{
    return this._http.put<void>(this.baseUrl + `/articles/${slug}`,{article:data});
  }
  deleteArticle(slug:string) {
    return this._http.delete(this.baseUrl + `/articles/${slug}`);
  }
}
interface ArticleDto<A>{
  articles:A[];
  articlesCount: number;
}
