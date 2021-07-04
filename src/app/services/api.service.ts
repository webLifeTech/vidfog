import { Injectable, resolveForwardRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  serverURl: string = 'http://4kfullscreenvideostatus.com/appv1/videoapi/';
  constructor(
    public http: HttpClient
  ) {
    this.post('getLanguageList', '');
  }

  get(url: string) {
    return new Promise((resolve, reject) => {
      this.http.get(this.serverURl + url).subscribe((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      })
    })
  }

  // this.api.post('getLanguageList', '').then((res) => {
  //   console.log("res>>>>", res);
  //   if (res['ResponseCode'] == 1) {
  //     this.allVideoLanguage = res['ResultData'];
  //     console.log(this.allVideoLanguage);
  //   } else {
  //     this.messageToast('Something went wrong');
  //   }
  // }, err => {
  //   this.messageToast('Something went wrong');
  // })


  post(url: string, data: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.serverURl + url, '').subscribe((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      })
    })
  }


  put(url?: string, data?: any) {
    return new Promise((resolve, reject) => {
      this.http.put(this.serverURl + url, data).subscribe((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      })
    })
  }

  delete(url?: string, data?: any) {
    return new Promise((resolve, reject) => {
      this.http.delete(this.serverURl + url + data).subscribe((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      })
    })
  }

  postFormData(url?: string, formData?: FormData, options?) {
    return new Promise((resolve, reject) => {
      this.http.post(this.serverURl + url, formData).subscribe((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      })
    })
  }


}
