import {
  AngularFirestoreCollection,
  AngularFirestore,
} from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Cotizacion } from '../Model/cotizacion.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class CotizacionServicio {
  cotizacionesColeccion: AngularFirestoreCollection<Cotizacion>;

  constructor(db: AngularFirestore) {
    // Trae la coleccion Clintes desde FireBase
    this.cotizacionesColeccion = db.collection('Quotation');
  }

  getQuotation(): Observable<Cotizacion[]> {
    // Obtenemos las Cotizaciones...
    return this.cotizacionesColeccion.get().pipe(
      map((collection) => {
        return collection.docs.map((doc) => {
          const data = doc.data() as Cotizacion;
          data.id = doc.id;
          return data;
        });
      })
    );
  }
}
