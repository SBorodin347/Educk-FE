import {AfterViewInit, Component, ElementRef, HostListener, Input, ViewChild} from '@angular/core';
import {User} from "../../models/user.model";

@Component({
  selector: 'app-user-select',
  templateUrl: './user-select.component.html',
  styleUrls: ['./user-select.component.scss']
})
export class UserSelectComponent {

  constructor() { }

  selectVisible: boolean = false
  searchString: string = ''
  isCompleted: boolean = false

  @Input()
  options: User[]

  @Input()
  field: any

  @Input()
  search: boolean

  @Input()
  defaultPlaceholder: string

  @Input()
  searchPlaceholder: string

  @Input()
  invalid: boolean

  @Input()
  size: string

  dropdown(): void {
    this.selectVisible = !this.selectVisible
    if(this.selectVisible){
      setTimeout(()=>{this.searchInput.nativeElement.focus();},0);
    }
  }

  getPlaceholder(): string{
    if(this.field.value != undefined && this.options.length != 0) {
      const option = this.options.find((el) => el.id == this.field.value)
        return option.firstName + ' ' + option.lastName
    } else {
      return this.defaultPlaceholder
    }
  }

  onSelectDropdownValue(id: number): void{
    if (this.options.find((el) => el.id == id).accessible == false){
      alert(`User with ID ${id} is unavailable`)
    } else {
      this.field.setValue(id)
      this.isCompleted = this.invalid = this.selectVisible = false;
    }
  }

  getSize(){
    if(this.size == 'small' && this.search) {
      return 'select-primary-dropdown-scroll select-small-search'
    }
    if(this.size == 'big') {
      return 'select-primary-dropdown-scroll select-big'
    }
  }

  @ViewChild('select_dropdown') selectDropDown: ElementRef;
  @ViewChild('search_input') searchInput!: ElementRef<HTMLInputElement> | undefined

  @HostListener('document:click', ['$event'])
  onClick(event: Event) {
    if (!this.selectDropDown.nativeElement.contains(event.target)) {
      if(this.selectVisible) this.isCompleted = this.field.invalid == true
      this.selectVisible = false
    }
  }

  trackByFn(index, item) { return item.id }

}
