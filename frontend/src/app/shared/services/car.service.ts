import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { CarModel } from '../models/car.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private httpClient : HttpClient) { }

  apiUrl = environment.apiUrl;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer '+sessionStorage.getItem("auth-token")
    })
  };

  public create(data : CarModel): Observable<CarModel>{
    return this.httpClient.post<CarModel>(this.apiUrl +"/car/create", data, this.httpOptions);
  }

  public update(id: number, data : CarModel): Observable<any> {
    return this.httpClient.put<any>(this.apiUrl +"/car/edit/"+id, data, this.httpOptions);
  }

  public getAll(): Observable<{data : CarModel[]}> {
    return this.httpClient.get<{data : CarModel[]}>(this.apiUrl +"/car", this.httpOptions);
  }

  public getById(id: number): Observable<{data :CarModel}> {
    return this.httpClient.get<{data :CarModel}>(this.apiUrl +"/car/"+id, this.httpOptions);
  }

  public destroy(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.apiUrl +"/car/delete/"+id, this.httpOptions);
  }
}
