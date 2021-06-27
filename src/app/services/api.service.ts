import { Injectable, resolveForwardRef } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  serverURl: string = 'http://davaexim.com/ERP/mlm/api/Mlm.php';
  imageURl: string = 'http://davaexim.com/ERP/mlm/admin/images/';
  constructor(
    public http: HttpClient
  ) { }

  get(url: string) {
    return new Promise((resolve, reject) => {
      this.http.get(this.serverURl + url).subscribe((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      })
    })
  }


  post(data: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.serverURl, data).subscribe((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      })
    })
  }


  put(url: string, data: any) {
    return new Promise((resolve, reject) => {
      this.http.put(this.serverURl + url, data).subscribe((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      })
    })
  }

  delete(url: string, data: any) {
    return new Promise((resolve, reject) => {
      this.http.delete(this.serverURl + url + data).subscribe((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      })
    })
  }

  postFormData(url: string, formData: FormData, options?) {
    return new Promise((resolve, reject) => {
      this.http.post(this.serverURl + url, formData).subscribe((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      })
    })
  }


}
