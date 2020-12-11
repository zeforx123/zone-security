import {
  AngularFirestoreCollection,
  AngularFirestore,
} from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Cliente } from '../Model/cliente.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ClienteServicio {

  constructor(db: AngularFirestore) {
    // Trae la coleccion Clintes desde FireBase
    this.clientesColeccion = db.collection('Clientes');
  }
  clientesColeccion: AngularFirestoreCollection<Cliente>;

  getClientes(): Observable<Cliente[]> {
    // Obtenemos los Clientes...
    return this.clientesColeccion.get().pipe(
      map((collection) => {
        return collection.docs.map((doc) => {
          const data = doc.data() as Cliente;
          data.id = doc.id;
          return data;
        });
      })
    );
  }

  getCliente(id: string): Observable<Cliente> {
    return this.clientesColeccion
    .doc(id)
    .get()
    .pipe(
      map((doc) => {
        if (doc.exists === false) {
          return null;
        } else {
          const data = doc.data() as Cliente;
          data.id = doc.id;
          return data;
        }
      })
    );
  }

  agregarCliente(cliente: Cliente) {
    this.clientesColeccion.add(cliente);
  }

  modificarCliente(cliente: Cliente) {
    this.clientesColeccion.doc(cliente.id).update(cliente);
  }

  eliminarCliente(cliente: Cliente) {
    this.clientesColeccion.doc(cliente.id).delete();
  }

}
