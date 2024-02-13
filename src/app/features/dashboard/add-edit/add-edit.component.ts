import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import { JsonPipe, Location, NgForOf, NgIf } from "@angular/common";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { DashboardService } from "../dashboard.service";

@Component({
  selector: 'app-add-edit',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    ReactiveFormsModule,
    JsonPipe,
    NgIf
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

  addArticle = new FormGroup({
    title: new FormControl(null,{validators: [Validators.required,]}),
    description: new FormControl(null,{validators: [Validators.required,]}),
    body: new FormControl(null,{validators: [Validators.required,]}),
    tagList: new FormControl(this.tagLists),
  });

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

  add() {
    this._api.addArticle({ ...this.addArticle.value, tagList: this.tagLists }).subscribe({next:(a) => {
      this.addArticle.reset();
      this._toastr.success('Article Added Successfully', 'Done!', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
        closeButton: true
      });},
      error: () => {
        this._toastr.error('Try Again Later', 'Something Went Wrong',{
          timeOut: 5000,
          positionClass: 'toast-top-right',
          closeButton: true
      });
      }
    });
    console.log(this.addArticle.value);
  }
  edit() {
    this._api.editArticle({ ...this.addArticle.value, tagList: this.tagLists},this.editArticle.slug).subscribe({next: () => {
      this.router.navigate(['/list']);
      this._toastr.success('Article Edited Successfully', 'Edited Done!', {
        timeOut: 4000,
        positionClass: 'toast-top-right',
        closeButton: true
      });},
      error : () => {
        this._toastr.error('Try Again Later', 'Something Went Wrong',{
          timeOut: 5000,
          positionClass: 'toast-top-right',
          closeButton: true
      });
      }
    })
  }
  changeTags(tag: string) {
    this.tagLists.push(tag);
    console.log(this.tagLists);

  }
}
