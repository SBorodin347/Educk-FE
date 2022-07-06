import {Component, ElementRef, Output, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../services/user/user.service";
import {ROLE, User, UserList} from "../../models/user.model";
import {Subscription} from "rxjs";
import {UserListComponent} from "../../user-list/user-list.component";
import {query} from "@angular/animations";

@Component({
  selector: 'app-referent-page',
  templateUrl: './referent-page.component.html',
  styleUrls: ['./referent-page.component.scss']
})
export class ReferentPageComponent {

  referents: UserList[] = [];
  public currentPageUrl: string;
  public searchString = '';
  toolbarVisible = false;

  private subscription: Subscription = new Subscription();

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void{
    this.currentPageUrl = this.router.url;
    this.refreshReferents();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  @ViewChild(UserListComponent)
  childComponentList: UserListComponent;

  @Output()
  showToolbar(){
    this.toolbarVisible = true;
  }

  @Output()
  hideToolbar(){
    this.toolbarVisible = false;
  }


  deleteUser(){
    if (confirm('Do you really want to delete this?')){
      this.childComponentList.deleteUsers();
      this.childComponentList.showRemovingNotification();
      this.hideToolbar();
    }
  }

  exportUser(){
    this.childComponentList.openPDF();
    this.childComponentList.uncheck();
    this.hideToolbar();
  }


  refreshReferents(): void{
    this.userService.getUsersByRoleName(ROLE.REFERENT).subscribe(data => {
      console.log('Prislo:',data);
      this.referents = data;
    });
  }

  add(referent: User): void{
    this.userService.createUser(referent).subscribe(data => {
      this.refreshReferents();
    });
  }

  deleteReferentFromList(referentId: number): void {
    this.subscription.add(this.userService.deleteUser(referentId).subscribe(data => {
      this.refreshReferents();
    }));
  }

  addReferentQuery(): void{
      this.router.navigate(['/user'], {queryParams: {type: 'referent'}});
  }

}
