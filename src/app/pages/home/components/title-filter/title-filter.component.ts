import {Component, EventEmitter, OnChanges, Output} from '@angular/core';
import {InputTextModule} from "primeng/inputtext";
import {FormsModule} from "@angular/forms";
import {sendEmailVerification} from "@angular/fire/auth";

@Component({
  selector: 'app-title-filter',
  standalone: true,
  imports: [
    InputTextModule,
    FormsModule
  ],
  templateUrl: './title-filter.component.html',
})
export class TitleFilterComponent {
  @Output() titleChange = new EventEmitter<string>();

  value: string = '';


  sendOutput() {
    this.titleChange.emit(this.value);
  }

  protected readonly sendEmailVerification = sendEmailVerification;
}
