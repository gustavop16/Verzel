import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserModel } from '../models/user.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient : HttpClient) { }
  
  apiUrl = environment.apiUrl;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  };

  public create(data : UserModel): Observable<UserModel>{
    return this.httpClient.post<UserModel>(this.apiUrl +"/user/create", data, this.httpOptions);
  }
}
