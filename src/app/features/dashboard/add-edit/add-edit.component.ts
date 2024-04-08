import { Component, ElementRef, inject, OnInit, QueryList, ViewChildren } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import { AsyncPipe, JsonPipe, Location, NgForOf, NgIf } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { DashboardService } from "../dashboard.service";
import { Observable, Subject, switchMap, tap } from "rxjs";

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
  private _location = inject(Location);
  private _toastr = inject(ToastrService);
  loading = false;
  router = inject(Router);
  editMode: boolean = false;
  editArticle ?: any;
  editTrigger = new Subject<undefined>();
  addTrigger = new Subject<undefined>();
  editSubmit?: Observable<void>;
  addSubmit?: Observable<void>;
  editSlug: any;

  addArticle = new FormGroup({
    title: new FormControl(null, { validators: [Validators.required,] }),
    description: new FormControl(null, { validators: [Validators.required,] }),
    body: new FormControl(null, { validators: [Validators.required,] }),
    tagList: new FormArray(
      new Array(10).fill(0).map((_, i) => new FormControl(false))
    ),
  });

  get tagList() {
    return this.addArticle.controls['tagList']
  }

  constructor(private _path: ActivatedRoute) {
    this.editSubmit = this.editTrigger
      .pipe(
        switchMap((val) => {
          this.loading = true;
          return this._api.editArticle({
            ...this.addArticle.value,
          }, this.editArticle.slug)
        }),
        tap({
          next: () => {
            this.loading = false;
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
          this.loading = true;
          return this._api.addArticle({ ...this.addArticle.value,
            tagList: Object.entries(this.addArticle.value.tagList!).
            filter(( [ _, val] ) => val ).map(( [ key, _] ) => key ) });
          }),
        tap({
          next: () => {
            this.loading = false;
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
    const slug = this._path.snapshot.paramMap.get('slug');
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
}
