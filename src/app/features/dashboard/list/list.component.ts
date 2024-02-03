import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from "../../../services/api.service";
import { AsyncPipe, JsonPipe, NgForOf, NgIf } from "@angular/common";
import { async, fromEvent, map, Subscription } from "rxjs";
import { NgxPaginationModule } from "ngx-pagination";
import { Router } from "@angular/router";

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    JsonPipe,
    NgIf,
    NgForOf,
    AsyncPipe,
    NgxPaginationModule
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit, OnDestroy {
  private _api = inject(ApiService);
  articles: any;
  p: number = 1;
  opt: Boolean = false;
  private subscriptions: Subscription = new Subscription()
  router = inject(Router);
  ngOnInit() {
    this.subscriptions.add(
      fromEvent(document, 'click').subscribe((event: any) => {
        const hasExpand = this.articles.findIndex((item: any) => {
          return item.expand === true;
        })
        if (hasExpand >= 0) {
          this.articles[hasExpand].expand = false
        }
      })
    );
    this._api.getArticle(this.p).subscribe((a: any) => {
      this.articles = a.articles.map((item: any) => ({
        ...item, expand: false
      }));
      console.log(a);
    });

  }

  nextPage(event: any) {
    this._api.getArticle(event).subscribe((a: any) => {
      this.articles = a.articles.map((item: any) => ({
        ...item, expand: false
      }));
      this.p = event;
    });
  }

  openOpt(i: number, event: any) {
    const hasExpand = this.articles.findIndex((item: any) => {
      return item.expand === true;
    })
    if (hasExpand >= 0) {
      this.articles[hasExpand].expand = false
    }
    this.articles[i].expand = !this.articles[i].expand;
    event.stopPropagation();
  }

  deleteArticle(i: number, event: any) {
    this._api.deleteArticle(this.articles[i].slug).subscribe((a) => {
      this._api.getArticle(1).subscribe((a: any) => {
        this.articles = a.articles.map((item: any) => ({
          ...item, expand: false
        }));
        console.log(a);
      });
    });
    event.stopPropagation();
  }

  editArticle(i: number, event: any) {
    this.router.navigate(['/edit'], {
      state:{
        ...this.articles[i]
      }
    })

    this.articles[i].expand = !this.articles[i].expand;
    event.stopPropagation();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }
}
