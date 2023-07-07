import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements DoCheck {
  title = 'BRSProj';
  isMenuReq = false;
  isAdmin = false;
  isNeedy = false;
  isIhtiyac = false;

  constructor(private router: Router, private service: AuthService) {}
  ngDoCheck(): void {
    let currentUrl = this.router.url;
    if (currentUrl == '/login' || currentUrl == '/register') {
      this.isMenuReq = false;
    } else {
      this.isMenuReq = true;
    }
    if (this.service.GetUserRole() === 'admin') {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
    if (this.service.GetUserRole() === 'yardimci') {
      this.isNeedy = true;
    } else {
      this.isNeedy = false;
    }
    if (this.service.GetUserRole() === 'ihtiyac') {
      this.isIhtiyac = true;
    } else {
      this.isIhtiyac = false;
    }
  }
}
