import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AsyncPipe, JsonPipe, NgClass, NgForOf, NgIf } from "@angular/common";
import { async, expand, fromEvent, map, Subscription } from "rxjs";
import { NgxPaginationModule } from "ngx-pagination";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { DashboardService } from "../dashboard.service";
import { Article, ArticleAdd, ArticleDTO } from "../../../core/models/article.model";
import { MenuModule} from "primeng/menu";
import { ButtonModule} from "primeng/button";
@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    JsonPipe,
    NgIf,
    NgForOf,
    AsyncPipe,
    NgxPaginationModule,
    NgClass,
    MenuModule,
    ButtonModule,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit, OnDestroy {
  private _api = inject(DashboardService);
  articles: any;
  page: number = 1;
  opt: Boolean = false;
  private subscriptions: Subscription = new Subscription()
  router = inject(Router);
  private _toastr = inject(ToastrService);

  articles$ = this._api.getArticle(1);

  getArticles(pageIndex:number){
    this._api.getArticle(pageIndex).subscribe((a: Article[]) => {
      this.articles = a.map((item: Article) => ({
        ...item, expand: false
      }));
    this.page = pageIndex
    });
  }
  ngOnInit() {
    this.getArticles(1);
  }

  nextPage(event: number) {
    this.getArticles(event);
  }
  deleteArticle(i: number, event: any) {
    const cnfrm = confirm('Are you sure you want to delete?');
    if(cnfrm){
      this._api.deleteArticle(this.articles[i].slug).subscribe({next:(a) => {
        this._api.getArticle(1);
        this._toastr.success('Item removed successfully','Article Deleted',{
          timeOut: 3000,
          positionClass: 'toast-top-right',
          closeButton: true
        });},
        error : () => {
          this._toastr.error('Please try again later', 'Something went wrong', {
            timeOut: 5000,
            positionClass: 'toast-top-right',
            closeButton: true
        });
        }
      });
    }
    event.stopPropagation();
  }

  editArticle(i: number, event: any) {
    this.router.navigate(['/edit'], {
      state:{
        ...this.articles[i]
      }
    });
    this._toastr.info("Don't forget to save",'',{
      timeOut: 3000,
      positionClass: 'toast-top-right',
      closeButton: true
    });

    this.articles[i].expand = !this.articles[i].expand;
    event.stopPropagation();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }
}

