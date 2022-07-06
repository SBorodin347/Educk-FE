import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ROLE, User} from "../../models/user.model";
import {UserService} from "../../services/user/user.service";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {StudentService} from "../../services/user/student.service";


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  activeRadioButton: string = undefined;
  invalid: boolean = false
  ROLE = ROLE;
  form: FormGroup
  private subscription: Subscription = new Subscription();

  constructor(private userService: UserService, private router: Router, private activeRouter: ActivatedRoute, private studentService: StudentService) {
    this.createForm();
  }

  ngOnInit(): void {
    this.subscription.add(this.activeRouter.queryParams.subscribe( param => {
      if(param.type == 'student'){
        this.form.controls.roleId.setValue(4);
        this.activeRadioButton = param.type
      }
      if(param.type == 'referent'){
        this.form.controls.roleId.setValue(2);
        this.activeRadioButton = param.type;
      }
      if(param.type == 'teacher'){
        this.form.controls.roleId.setValue(3);
        this.activeRadioButton = param.type;
      }
    }))
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

  switchRadio(radio): void{
    this.activeRadioButton = radio;
  }

  public createForm(){
    this.form = new FormGroup({
        id: new FormControl(null, ),
        username: new FormControl(null, [Validators.required]),
        firstName: new FormControl(null, [Validators.required]),
        lastName: new FormControl(null, [Validators.required]),
        email: new FormControl(null, [Validators.required]),
        phone: new FormControl(null, [Validators.required]),
        passwordHash: new FormControl(null, [Validators.required]),
        roleId: new FormControl(null, [Validators.required]),
      }
    )
  }

  public createUser(): void{
    if(this.form.valid){
      this.invalid = false;
      if(this.form.controls.roleId.value == 2){
        this.userService.createUser(this.form.value).subscribe();
        this.router.navigate(['/referents']).then(()=>{
          window.location.reload();
        })
      }
      if(this.form.controls.roleId.value == 3){
        this.router.navigate(['/teachers']).then(()=>{
          window.location.reload();
        })
      }
      if(this.form.controls.roleId.value == 4){
        this.studentService.createStudent(this.form.value).subscribe();
        this.router.navigate(['/students']).then(()=>{
          window.location.reload();
        })
      }
      this.form.reset();
    } else {
      this.invalid = true;
    }
  }
}

