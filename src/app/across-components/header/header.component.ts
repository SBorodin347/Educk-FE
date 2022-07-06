import {Component, ElementRef, HostListener, Injectable, OnInit} from '@angular/core';
import {AuthService} from "../../services/authentication/auth.service";
import {User} from "../../models/user.model";
import {UserService} from "../../services/user/user.service";
import {FileService} from "../../services/file.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user: User;
  avatarUrl;
  menu: boolean = false;
  reader = new FileReader();

  constructor(private element: ElementRef, private auth: AuthService, private userService: UserService, private fileService: FileService) { }

  ngOnInit(): void {
    // this.fileService.show("14.png").subscribe(data => {
    //   if(data.body instanceof Blob){
    //     this.reader.readAsDataURL(data.body);
    //     this.reader.onload = _event => {
    //       this.avatarUrl =  this.reader.result;
    //     };
    //   }
    // })
  }

  openMenu(){
    this.menu = !this.menu;
  }

  @HostListener('document:click', ['$event'])
  onClick(event: Event) {
    if (!this.element.nativeElement.contains(event.target)) {
      this.menu=false;
    }
  }

  public logout(): void{
    this.auth.logout();
  }

}
