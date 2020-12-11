import {
  AngularFirestoreCollection,
  AngularFirestore,
} from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Producto } from '../Model/producto.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ProductoServicio {
  productosColeccion: AngularFirestoreCollection<Producto>;

  constructor(db: AngularFirestore) {
    // Trae la coleccion Productos desde FireBase
    this.productosColeccion = db.collection('Product');
  }

  getProductos(): Observable<Producto[]> {
    // Obtenemos los Productos...
    return this.productosColeccion.get().pipe(
      map((collection) => {
        return collection.docs.map((doc) => {
          const data = doc.data() as Producto;
          data.id = doc.id;
          return data;
        });
      })
    );
  }

  getProducto(id: string): Observable<Producto> {
    return this.productosColeccion
      .doc(id)
      .get()
      .pipe(
        map((doc) => {
          if (doc.exists === false) {
            return null;
          } else {
            const data = doc.data() as Producto;
            data.id = doc.id;
            return data;
          }
        })
      );
  }

  agregarProducto(producto: Producto) {
    this.productosColeccion.add(producto);
  }

  modificarProducto(producto: Producto) {
    this.productosColeccion.doc(producto.id).update(producto);
  }

  eliminarProducto(producto: Producto) {
    this.productosColeccion.doc(producto.id).delete();
  }
}
