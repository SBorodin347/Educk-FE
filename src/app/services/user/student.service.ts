import { Injectable } from '@angular/core';
import {Student} from "../../models/user.model";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private apiUrl = 'http://localhost:8080/api/students';

  constructor(private http: HttpClient) { }

  createStudent(student: Student): Observable<Student>{
    return this.http.post<Student>(`${this.apiUrl}`, student);
  }

  getStudents(): Observable<Student[]>{
    return this.http.get<Student[]>(`${this.apiUrl}`);
  }


}
