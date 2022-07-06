import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  upload(formData: FormData): Observable<HttpEvent<string[]>>{
    return this.http.post<string[]>(`${this.apiUrl}/upload/`, formData, {
      reportProgress: true,
      observe: 'events'
    })
  }

  download(filename: string): Observable<HttpEvent<Blob>>{
    return this.http.get(`${this.apiUrl}/download/${filename}`, {
      reportProgress: true,
      observe: 'events',
      responseType: 'blob'
    })
  }

  show(filename: string): Observable<any>{
    return this.http.get(`${this.apiUrl}/download/${filename}`, {
      reportProgress: true,
      observe: 'events',
      responseType: 'blob'
    })
  }


}
