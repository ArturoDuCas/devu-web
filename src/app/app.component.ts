import {Component, inject, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ButtonModule} from 'primeng/button';
import {Ripple} from "primeng/ripple";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {environment} from "../environments/environment";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ButtonModule,
    Ripple
  ],
  templateUrl: './app.component.html',
})
export class AppComponent  {

}
