import { Component, inject, OnDestroy } from '@angular/core';
import { AsyncPipe, JsonPipe, NgClass, NgForOf, NgIf } from "@angular/common";
import { BehaviorSubject, map, Observable, Subject, Subscription, switchMap, tap } from "rxjs";
import { NgxPaginationModule } from "ngx-pagination";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { DashboardService } from "../dashboard.service";
import { Article } from "../../../core/models/article.model";
import { MenuModule } from "primeng/menu";
import { ButtonModule } from "primeng/button";

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
export class ListComponent implements OnDestroy {

  private _api = inject(DashboardService);
  private _subscription: Subscription = new Subscription();
  private _toastr = inject(ToastrService);
  router = inject(Router);
  loading = false;

  articles$?: Observable<Article[]>;
  page$ = new BehaviorSubject(1);
  deleteSlug$ = new Subject<string>();
  deleteSubmit?: Observable<any>;

  constructor() {
    this.articles$ = this.page$.pipe(
      switchMap((page) => {
        this.loading = false;
        return this._api.getArticle(page);
      })
    );
    this.deleteSubmit = this.deleteSlug$.pipe(
      switchMap(slug => {
      this.loading = true;
      return this._api.deleteArticle(slug);
    }), tap({
      next: (a) => {
        this.loading = false;
        this.page$.next(1);
        this._toastr.success('Item removed successfully', 'Article Deleted', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
          closeButton: true
        });
      },
      error: () => {
        this.loading = false;
        this._toastr.error('Please try again later', 'Something went wrong', {
          timeOut: 5000,
          positionClass: 'toast-top-right',
          closeButton: true
        });
      }
    }));

  }

  deleteArticle(slug: string, event: any) {
    const cnfrm = confirm('Are you sure you want to delete?');
    if (cnfrm) {
      this.deleteSlug$.next(slug);
    }
  }

  editArticle(i: number, event: any) {
    this.router.navigate(['/edit'], {
      state: {
        // ...this.articles[i]
      }
    });
    this._toastr.info("Don't forget to save", '', {
      timeOut: 3000,
      positionClass: 'toast-top-right',
      closeButton: true
    });
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}

