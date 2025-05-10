import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";
// import { FooterComponent } from './components/footer/footer.component';
import {TranslateModule} from "@ngx-translate/core";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent,  TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Susca Watts Academy';
  constructor(private translate: TranslateService) {
    this.translate.addLangs(['af', 'en']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }
}
