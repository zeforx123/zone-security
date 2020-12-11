import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string;
  password: string;

  constructor(private router: Router,
              private flashMessages: FlashMessagesService,
              private authService: AuthService) { }

  login() {
    this.authService.login(this.email, this.password)
      .then( res => {
        this.router.navigate(['/clientes']);
      })
      .catch(error => {
        this.flashMessages.show('Usted no se encuentra Registrad@ en el Sistema', {
          cssClass: 'alert-danger', timeout: 6000
        });
      });
  }
}
