import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { tap, map, take } from 'rxjs/operators';
import { AuthService } from '../Services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CanAdminGuard implements CanActivate {
  constructor(private router: Router, private authSvc: AuthService) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.authSvc.isEmployee$.pipe(
      map((value) => value),
      tap((isEmployee) => {
        if (isEmployee) {
          window.alert('No tienes');
          this.router.navigate(['/clientes']);
        }
      })
    );
  }
}
