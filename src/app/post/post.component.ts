
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { MediaModel } from './Media.model';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {


 
  formValue !: FormGroup;
  MediaModelObj : MediaModel = new MediaModel();
  MediaData !: any;
  showAdd !: boolean;
  showUpdate !: boolean;

  constructor(private formbuilder: FormBuilder,
    private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      firstName : [''],
      lastName : [''],
      email : [''],
      mobile : [''],
      payment : ['']
    })
    this.getAllMedia();
  }

  clickAddMedia(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postMediaDetails(){
    this.MediaModelObj.firstName = this.formValue.value.firstName;
    this.MediaModelObj.lastName = this.formValue.value.lastName;
    this.MediaModelObj.email = this.formValue.value.email;
    this.MediaModelObj.mobile = this.formValue.value.mobile;
    this.MediaModelObj.payment = this.formValue.value.payment;

    this.api.postMedia(this.MediaModelObj)
    .subscribe(res=>{
      console.log(res);
      alert("Post added successfully")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllMedia();
    },
    err=>{
      alert("Something went wrong")
    })
  }

  getAllMedia(){
    this.api.getMedia()
    .subscribe(res=>{
      this.MediaData = res;
    })
  }

  deleteMedia(row: any){
    this.api.deleteMedia(row.id)
    .subscribe(res=>{
      alert("Post Deleted");
      this.getAllMedia();
    })
  }

  onEdit(row: any){
    this.showAdd = false;
    this.showUpdate = true;
    this.MediaModelObj.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['payment'].setValue(row.payment);
  }

  updateMediaDetails(){
    this.MediaModelObj.firstName = this.formValue.value.firstName;
    this.MediaModelObj.lastName = this.formValue.value.lastName;
    this.MediaModelObj.email = this.formValue.value.email;
    this.MediaModelObj.mobile = this.formValue.value.mobile;
    this.MediaModelObj.payment = this.formValue.value.payment;

    this.api.updateMedia(this.MediaModelObj,this.MediaModelObj.id)
    .subscribe(res=>{
      alert("Updated successfully")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllMedia();
    })
  }
 
  
}
