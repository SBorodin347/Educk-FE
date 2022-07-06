import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {NgxPermissionsService} from "ngx-permissions";
import {AuthService} from "../services/authentication/auth.service";
import {CourseService} from "../services/course/course.service";
import {CoursesList} from "../models/course.model";
import {UserService} from "../services/user/user.service";
import { saveAs } from 'file-saver';
import {Subscription} from "rxjs";
import {ROLE, Student} from "../models/user.model";
import {FileService} from "../services/file.service";
import {HttpErrorResponse, HttpEvent, HttpEventType} from "@angular/common/http";
import { DomSanitizer } from '@angular/platform-browser';
import {StudentService} from "../services/user/student.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements OnInit{

  courses: CoursesList[] = []
  numberOfCourses: number;
  ROLE = ROLE;
  numberOfAdmins: number;
  numberOfRefs: number;
  numberOfStudents: number;
  numberOfTeachers: number;
  filenames: string[] = []
  private subscription: Subscription = new Subscription();
  fileStatus = {status: '', requestType: '', percent: 0}

  constructor(private fileService: FileService, private auth: AuthService, private studentService: StudentService) {
  }

  getFirstName(): string{
    return localStorage.getItem('firstName');
  }


  ngOnInit() {

    // this.fileService.show(this.auth.getUserId()+".png").subscribe(data => {
    //   const reader = new FileReader();
    //   if(data.body instanceof Blob){
    //     reader.readAsDataURL(data.body); //FileStream response from .NET core backend
    //     reader.onload = _event => {
    //       let url = reader.result; //url declared earlier
    //       this.image = url; //image declared earlier
    //     };
    //   }
    // })


  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onUploadFiles(files: File[]): void {
    const formData = new FormData();
    for (const file of files) { formData.append('files', file, this.auth.getUserId()+".png"); }
    this.fileService.upload(formData).subscribe(
      event => {
        console.log(event);
        this.reportProgress(event);
      }
    );
  }

  onDownloadFile(filename: string): void{
       this.fileService.download(filename).subscribe(data => {
         console.log(data);
         this.reportProgress(data);
       })
  }

  private reportProgress(httpEvent: HttpEvent<string[] | Blob>): void{
    switch (httpEvent.type){
      case HttpEventType.UploadProgress:
        this.updateStatus(httpEvent.loaded, httpEvent.total, 'Uploading');
        break;
      case HttpEventType.DownloadProgress:
        this.updateStatus(httpEvent.loaded, httpEvent.total, 'Uploading');
        break;
      case HttpEventType.ResponseHeader:
        console.log('Header returned', httpEvent);
        break;
      case HttpEventType.Response:
        if(httpEvent.body instanceof Array){
          for(const filename of httpEvent.body){
            this.filenames.unshift(filename);
          }
        }else{
          saveAs(new File([httpEvent.body!], httpEvent.headers.get('File-Name'),
            { type: `${httpEvent.headers.get('Content-Type')};charset=utf-8`}));
          // saveAs(new Blob([httpEvent.body!],
          //   { type: `${httpEvent.headers.get('Content-Type')};charset=utf-8`}));
        }
        break;
        default:
        console.log(httpEvent);
    }
  }

  private updateStatus(loaded: number, total: number, requestType: string) {
     this.fileStatus.status = 'progress';
     this.fileStatus.requestType = requestType;
     this.fileStatus.percent = Math.round(100 * loaded / total);
  }
}
