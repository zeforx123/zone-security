import {
  AngularFirestoreCollection,
  AngularFirestore,
} from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Empleado } from '../Model/empleado.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class EmpleadoServicio {
  empleadosColeccion: AngularFirestoreCollection<Empleado>;

  constructor(db: AngularFirestore) {
    // Trae la coleccion Empleados desde FireBase
    this.empleadosColeccion = db.collection('Empleados');
  }

  getEmpleados(): Observable<Empleado[]> {
    // Obtenemos los Empleados...
    return this.empleadosColeccion.get().pipe(
      map((collection) => {
        return collection.docs.map((doc) => {
          const data = doc.data() as Empleado;
          data.id = doc.id;
          return data;
        });
      })
    );
  }

  getEmpleado(id: string): Observable<Empleado> {
    return this.empleadosColeccion
    .doc(id)
    .get()
    .pipe(
      map((doc) => {
        if (doc.exists === false) {
          return null;
        } else {
          const data = doc.data() as Empleado;
          data.id = doc.id;
          return data;
        }
      })
    );
  }

  agregarEmpleado(empleado: Empleado) {
    this.empleadosColeccion.add(empleado);
  }

  modificarEmpleado(empleado: Empleado) {
    this.empleadosColeccion.doc(empleado.id).update(empleado);
  }

  eliminarEmpleado(empleado: Empleado) {
    this.empleadosColeccion.doc(empleado.id).delete();
  }
}
