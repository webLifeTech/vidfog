import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { ApiService } from 'src/app/services/api.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup
  constructor(
    private uniqueDeviceID: UniqueDeviceID,
    private fb: FormBuilder,
    public gs: GlobalService,
    public api: ApiService,
  ) {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required]
    })
  }

  ngOnInit() {
  }

  loginUser() {
    if (this.loginForm.valid) {
      this.uniqueDeviceID.get().then((uuid: any) => {
        this.api.post('getCategoryList', '').then((res) => {
          console.log("res>>>>", res);
          if (res['ResponseCode'] == 1) {
            // this.allCategoryList = res['ResultData'];
            // console.log("this.allCategoryList>>>>", this.allCategoryList);
          } else {
            this.gs.messageToast('Something went wrong');
          }
        }, err => {
          this.gs.messageToast('Something went wrong');
        })
      }).catch((error: any) => console.log(error));
    } else {
      this.gs.messageToast('Please enter username')
    }
  }

  // getCetegory() {
  //   this.api.post('getCategoryList', '').then((res) => {
  //     console.log("res>>>>", res);
  //     if (res['ResponseCode'] == 1) {
  //       this.allCategoryList = res['ResultData'];
  //       console.log("this.allCategoryList>>>>", this.allCategoryList);
  //     } else {
  //       this.gs.messageToast('Something went wrong');
  //     }
  //   }, err => {
  //     this.gs.messageToast('Something went wrong');
  //   })
  // }

}
