import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PasswordUpdate, Student, User, UserList} from "../../models/user.model";

@Injectable({
  providedIn: 'root'
})

export class UserService{

  private apiUrl = 'http://localhost:8080/api/users';
  constructor(private http: HttpClient) { }

  getUsersByRoleName(role: string): Observable<UserList[]>{
    return this.http.get<UserList[]>(`${this.apiUrl}/?role=${role}`);
  }

  getUserByUserId(userId: number): Observable<User>{
    return this.http.get<User>(`${this.apiUrl}/${userId}`);
  }

  createUser(user: User): Observable<User>{
    return this.http.post<User>(`${this.apiUrl}`, user);
  }

  updatePassword(userId: number, password: PasswordUpdate): Observable<String>{
    return this.http.put<String>(`${this.apiUrl}/password/${userId}`, password);
  }

  verifyPassword(userId: number, password: string): Observable<boolean>{
    return this.http.get<boolean>(`${this.apiUrl}/verify/${userId}/${password}`);
  }

  deleteUser(userId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${userId}`);
  }

}
