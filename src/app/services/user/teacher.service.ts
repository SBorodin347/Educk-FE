import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Teacher} from "../../models/user.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TeacherService{

  private apiUrl = 'http://localhost:8080/api/teachers';

  constructor(private http: HttpClient) { }

  createTeacher(teacher: Teacher): Observable<Teacher>{
    return this.http.post<Teacher>(`${this.apiUrl}`, teacher);
  }

  getTeachers(): Observable<Teacher[]>{
    return this.http.get<Teacher[]>(`${this.apiUrl}`);
  }
}
