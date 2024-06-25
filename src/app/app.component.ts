import {Component, inject, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ButtonModule} from 'primeng/button';
import {Ripple} from "primeng/ripple";
import {TabMenuModule} from "primeng/tabmenu";
import {MenuItem} from "primeng/api";
import {ToastModule} from "primeng/toast";



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ButtonModule,
    Ripple,
    TabMenuModule,
    ToastModule
  ],
  templateUrl: './app.component.html',
})
export class AppComponent  implements OnInit {
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: ['/home'] },
      { label: 'Sell', icon: 'pi pi-fw pi-book', routerLink: ['/sell'] },
      { label: 'Dashboard', icon: 'pi pi-fw pi-calendar', routerLink: ['/dashboard'] },
    ]
  }

}
