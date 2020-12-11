import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { EmpleadoServicio } from './empleado.service';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    private fbAuth: AngularFireAuth,
    private empleadoService: EmpleadoServicio
  ) {}

  public isEmployee$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  async login(email: string, password: string) {
    const user = await this.fbAuth.auth.signInWithEmailAndPassword(
      email,
      password
    );
    // consulta si user esta en listado de empleados
    this.checkUserRole();
    return user;
  }

  // Metodo permite recuperar un usuario auntenticado
  getAuth() {
    return this.fbAuth.authState.pipe(map((auth) => auth));
  }

  async checkUserRole() {
    const empleados = await this.empleadoService.getEmpleados().toPromise();
    const isEmployee = empleados.some((empleado) => empleado.email === this.fbAuth.auth.currentUser.email);

    if (!isEmployee) {
      this.isEmployee$.next(false);
    } else {
      this.isEmployee$.next(true);
    }
  }

  isEmployeeUser() {
    return this.isEmployee$;
  }

  // Metodo para salir del Sistema
  logout() {
    this.fbAuth.auth.signOut();
    this.isEmployee$.next(true);
  }
}
