import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Modulos de FireBase
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import {
  AngularFirestoreModule,
  FirestoreSettingsToken,
} from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CabeceraComponent } from './Component/cabecera/cabecera.component';
import { TableroComponent } from './Component/tablero/tablero.component';
import { ClientesComponent } from './Component/clientes/clientes.component';
import { EditarClienteComponent } from './Component/editar-cliente/editar-cliente.component';
import { LoginComponent } from './Component/login/login.component';
import { PiePaginaComponent } from './Component/pie-pagina/pie-pagina.component';
import { ClienteServicio } from './Services/cliente.service';
import { ProductoServicio } from './Services/producto.service';
import { AuthService } from './Services/auth.service';
import { AuthGuard } from './Guardians/auth.guard';
import { ProductosComponent } from './Component/productos/productos.component';
import { EditarProductoComponent } from './Component/editar-producto/editar-producto.component';
import { CotizacionesComponent } from './Component/cotizaciones/cotizaciones.component';
import { EmpleadosComponent } from './Component/empleados/empleados.component';
import { EditarEmpleadoComponent } from './Component/editar-empleado/editar-empleado.component';
import { EmpleadoServicio } from './Services/empleado.service';
import { CotizacionServicio } from './Services/cotizacion.service';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { CanAdminGuard } from './Guardians/admin.guard';

@NgModule({
  declarations: [
    AppComponent,
    CabeceraComponent,
    TableroComponent,
    ClientesComponent,
    EditarClienteComponent,
    LoginComponent,
    PiePaginaComponent,
    ProductosComponent,
    EditarProductoComponent,
    CotizacionesComponent,
    EmpleadosComponent,
    EditarEmpleadoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(
      environment.firebaseConfig,
      'Control-Clientes'
    ),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    FlashMessagesModule.forRoot(),
  ],
  providers: [
    ClienteServicio,
    ProductoServicio,
    AuthService,
    AngularFireAuthGuard,
    EmpleadoServicio,
    CotizacionServicio,
    CanAdminGuard,
    { provide: FirestoreSettingsToken, useValue: {} },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
