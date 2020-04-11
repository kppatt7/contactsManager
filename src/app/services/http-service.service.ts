import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  environmentInfo = null;
  constructor(private http: HttpClient) {
    this.setEnvironment();
  }

  setEnvironment() {
    this.environmentInfo = environment.prod;
  }

  getData(apiParam): Observable<any> {
    return this.http.get(this.environmentInfo.serverUrl + apiParam.url);
  }

  postData(apiParam): Observable<any> {
    return this.http.post(this.environmentInfo.serverUrl + apiParam.url, apiParam.param);
  }
}
