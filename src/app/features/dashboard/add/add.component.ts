import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { JsonPipe, Location, NgForOf } from "@angular/common";
import { ApiService } from "../../../services/api.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    ReactiveFormsModule,
    JsonPipe
  ],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss'
})
export class AddComponent implements OnInit {
  private _api = inject(ApiService);
  tagLists: string[] = [];
  editMode: boolean = false;
  editArticle ?: any;
  private _location = inject(Location);
  router = inject(Router);
  private _toastr = inject(ToastrService);

  addArticle = new FormGroup({
    title: new FormControl(null),
    description: new FormControl(null),
    body: new FormControl(null),
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
    this._api.addArticle({ ...this.addArticle.value, tagList: this.tagLists }).subscribe(a => {
      this.addArticle.reset();
      this._toastr.success('Article Added Successfully', 'Done!', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
        closeButton: true
      });
      this._toastr.error('Try Again Later', 'Something Went Wrong',{
        timeOut: 5000,
        positionClass: 'toast-top-right',
        closeButton: true
      });
    });
    console.log(this.addArticle.value);
  }
  edit() {
    this._api.editArticle({ ...this.addArticle.value, tagList: this.tagLists},this.editArticle.slug).subscribe(a => {
      this._api.getArticle(1);
      this.router.navigate(['/list']);
      this._toastr.success('Article Edited Successfully', 'Edited Done!', {
        timeOut: 4000,
        positionClass: 'toast-top-right',
        closeButton: true
      });
      this._toastr.error('Try Again Later', 'Something Went Wrong',{
        timeOut: 5000,
        positionClass: 'toast-top-right',
        closeButton: true
      });
    })
  }


  changeTags(tag: string) {
    this.tagLists.push(tag);
    console.log(this.tagLists)
  }

}
