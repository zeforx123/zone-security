import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {

  isLoggedIn: boolean;
  loggedInUser: string;
  isEmployee: boolean;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.authService.getAuth().subscribe( auth => {
      if (auth) {
        this.isLoggedIn = true;
        this.loggedInUser = auth.email;
      } else { this.isLoggedIn = false; }
    });
    this.authService.checkUserRole();
    this.authService.isEmployeeUser().subscribe(value => {
      this.isEmployee = value;
    });
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
