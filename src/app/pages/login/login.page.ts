import { Component, OnInit } from '@angular/core';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private uniqueDeviceID: UniqueDeviceID
  ) { }

  ngOnInit() {
  }

  loginUser() {
    this.uniqueDeviceID.get().then((uuid: any) => {
      console.log(uuid)
    })
      .catch((error: any) => console.log(error));
  }

}
