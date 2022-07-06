import {Component, ElementRef, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {COURSE_SEMESTER, COURSE_TYPE, LANGUAGE} from "../../models/course.model";
import {STUDENT_ASSESSMENT} from "../../models/subscriptionModel";

@Component({
  selector: 'app-language-select',
  templateUrl: './language-select.component.html',
  styleUrls: ['./language-select.component.scss']
})
export class LanguageSelectComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  selectVisible: boolean = false
  searchString: string = ''
  isCompleted: boolean = false

  @Input()
  options: any[]

  @Input()
  field: any

  @Input()
  search: boolean

  @Input()
  defaultPlaceholder: string

  @Input()
  searchPlaceholder: string

  @Input()
  transformType: string

  @Input()
  invalid: boolean

  dropdown(): void {
    this.selectVisible = !this.selectVisible }

  getOptionIcon(opt){
    switch (opt){
      case (LANGUAGE.ENGLISH): return 'icon-eng'
      case (LANGUAGE.SLOVAK): return 'icon-sk'
      case (LANGUAGE.RUSSIAN): return 'icon-ru'
      case (LANGUAGE.HUNGARIAN): return 'icon-hu'
      case (LANGUAGE.CZECH): return 'icon-cz'
      case (LANGUAGE.POLISH): return 'icon-pl'
      default: return undefined;
    }
  }

  onSelectDropdownValue(opt): void{
    this.field.setValue(opt)
    this.isCompleted = this.selectVisible = false;
  }

  @ViewChild('select_dropdown') selectDropDown: ElementRef;

  @HostListener('document:click', ['$event'])
  onClick(event: Event) {
    if (!this.selectDropDown.nativeElement.contains(event.target)) {
      if(this.selectVisible) this.isCompleted = this.field.invalid == true
      this.selectVisible = false
    }
  }

}
