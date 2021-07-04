import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  currentFileUpload: any = null;
  base64Image: any = null;
  pageLabel: any = 'Login'
  constructor(
    private fb: FormBuilder,
    public gs: GlobalService,
    public api: ApiService,
  ) {
    this.loginForm = this.fb.group({
      device_token: ['', Validators.required],
      user_name: ['', Validators.required],
      user_email: [''],
      user_profile: [''],
      user_profile_old: [''],
      user_instagram: [''],
      user_telegram: [''],
      user_youtube: ['']
    })
    if (this.gs.userData && this.gs.userData.user_id) {
      this.pageLabel = 'Edit Profile';
      this.setFormData(this.gs.userData);
    }
  }

  ngOnInit() {
  }

  // My divece kye : 03993340-1665-a36f-8692-160499703718

  loginUser() {
    if (this.loginForm.valid) {
      this.gs.presentLoading('Please Wait...');
      let formData = new FormData();
      formData.append('device_token', this.loginForm.value.device_token);
      formData.append('user_name', this.loginForm.value.user_name);
      formData.append('user_email', this.loginForm.value.user_email);
      formData.append('user_profile', this.currentFileUpload ? this.currentFileUpload : '');
      formData.append('user_profile_old', this.loginForm.value.user_profile);
      formData.append('user_instagram', this.loginForm.value.user_instagram);
      formData.append('user_telegram', this.loginForm.value.user_telegram);
      formData.append('user_youtube', this.loginForm.value.user_youtube);
      this.api.post('updateUserProfile', formData).then((res) => {
        console.log("updateUserProfile>>>>", res);
        if (res['ResponseCode'] == 1) {
          this.gs.userData = res['ResultData'];
          this.gs.messageToast(res['ResponseMsg']);
          this.gs.dissmisLoding();
        } else {
          this.gs.dissmisLoding();
          this.gs.messageToast('Something went wrong');
        }
      }, err => {
        this.gs.dissmisLoding();
        this.gs.messageToast('Something went wrong');
      })
    } else {
      this.gs.messageToast('User Name is mandatory')
    }
  }

  fileChangeEvent(event) {
    console.log("event>>>", event[0]);
    this.currentFileUpload = event[0]
    this.encodeImageFileAsURL(event[0])
  }

  encodeImageFileAsURL(element) {
    var file = element;
    var reader = new FileReader();
    reader.onloadend = () => {
      console.log('RESULT', reader.result)
      this.base64Image = reader.result;
    }
    reader.readAsDataURL(file);
  }

  setFormData(formData) {
    this.loginForm.patchValue({
      device_token: formData.device_token,
      user_name: formData.user_name,
      user_email: formData.user_email,
      user_profile: formData.user_profile,
      user_profile_old: formData.user_profile_old || "",
      user_instagram: formData.user_instagram,
      user_telegram: formData.user_telegram,
      user_youtube: formData.user_youtube
    })
  }

}
