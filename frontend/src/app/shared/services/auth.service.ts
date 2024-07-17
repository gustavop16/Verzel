import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthModel} from '../models/auth.model';
import { tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient : HttpClient) { }

  apiUrl = environment.apiUrl;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  login(email: string, password: string){
        
    return this.httpClient.post<AuthModel>(this.apiUrl +"/auth/login", {"email": email, "password":password}, this.httpOptions).pipe(
      tap((value) => {
        sessionStorage.setItem("auth-token", value.token)
        sessionStorage.setItem("name", value.name)
      })
    )
  }

}
