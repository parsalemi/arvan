import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import { AsyncPipe, JsonPipe, Location, NgForOf, NgIf } from "@angular/common";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { DashboardService } from "../dashboard.service";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import { catchError, Observable, of, Subject, switchMap, tap, throwError } from "rxjs";

@Component({
  selector: 'app-add-edit',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    ReactiveFormsModule,
    JsonPipe,
    NgIf,
    AsyncPipe
  ],
  templateUrl: './add-edit.component.html',
  styleUrl: './add-edit.component.scss'
})
export class AddEditComponent implements OnInit {
  private _api = inject(DashboardService);
  tagLists: string[] = [];
  editMode: boolean = false;
  editArticle ?: any;
  private _location = inject(Location);
  router = inject(Router);
  private _toastr = inject(ToastrService);
  editTrigger = new Subject<undefined>()
  addTrigger = new Subject<undefined>()
  editSubmit?: Observable<void>
  addSubmit?: Observable<void>

  addArticle = new FormGroup({
    title: new FormControl(null, { validators: [Validators.required,] }),
    description: new FormControl(null, { validators: [Validators.required,] }),
    body: new FormControl(null, { validators: [Validators.required,] }),
    tagList: new FormControl(this.tagLists),
  });

  constructor() {
    this.editSubmit = this.editTrigger
      .pipe(
        switchMap((val) => {
          return this._api.editArticle({
            ...this.addArticle.value,
            tagList: this.tagLists
          }, this.editArticle.slug)
        }),
        tap({
          next: () => {
            // this.router.navigate(['/list']);
            this._toastr.success('Article Edited Successfully', 'Edited Done!', {
              timeOut: 4000,
              positionClass: 'toast-top-right',
              closeButton: true
            });
          },
          error: () => {
            this._toastr.error('Try Again Later', 'Something Went Wrong', {
              timeOut: 5000,
              positionClass: 'toast-top-right',
              closeButton: true
            });
          }
        })
      );

    this.addSubmit = this.addTrigger
      .pipe(
        switchMap((val) => {
          return this._api.addArticle({ ...this.addArticle.value, tagList: this.tagLists })
          }),
        tap({
          next: () => {
            this.addArticle.reset();
            this._toastr.success('Article Added Successfully', 'Done!', {
              timeOut: 3000,
              positionClass: 'toast-top-right',
              closeButton: true
            });
          },
          error: () => {
            this._toastr.error('Try Again Later', 'Something Went Wrong', {
              timeOut: 5000,
              positionClass: 'toast-top-right',
              closeButton: true
            });
          }
        })
      );
  }

  ngOnInit() {
    const state: any = this._location.getState();
    console.log(state, !!state);
    if (state.title) {
      this.editMode = true;
      this.editArticle = state;
      this.addArticle.setValue({
        title: state.title,
        description: state.description,
        body: state.body,
        tagList: state.tagList
      })
    }
  }


  changeTags(tag: string) {
    this.tagLists.push(tag);
    console.log(this.tagLists);

  }
}
