import {
  canActivate,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableroComponent } from './Component/tablero/tablero.component';
import { LoginComponent } from './Component/login/login.component';
import { EditarClienteComponent } from './Component/editar-cliente/editar-cliente.component';
import { EditarProductoComponent } from './Component/editar-producto/editar-producto.component';
import { ProductosComponent } from './Component/productos/productos.component';
import { CotizacionesComponent } from './Component/cotizaciones/cotizaciones.component';
import { EmpleadosComponent } from './Component/empleados/empleados.component';
import { EditarEmpleadoComponent } from './Component/editar-empleado/editar-empleado.component';
import { CanAdminGuard } from './Guardians/admin.guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectToDashboard = () => redirectLoggedInTo(['clientes']);

const routes: Routes = [
  { path: 'login', component: LoginComponent, ...canActivate(redirectToDashboard()) },
  {
    path: 'cotizaciones',
    component: CotizacionesComponent,
    ...canActivate(redirectUnauthorizedToLogin())
  },
  {
    path: 'empleados',
    component: EmpleadosComponent,
    ...canActivate(redirectUnauthorizedToLogin())
  },
  {
    path: 'empleado/editar/:id',
    component: EditarEmpleadoComponent,
    ...canActivate(redirectUnauthorizedToLogin())
  },
  {
    path: 'clientes',
    component: TableroComponent,
    ...canActivate(redirectUnauthorizedToLogin())
  },
  {
    path: 'cliente/editar/:id',
    component: EditarClienteComponent,
    ...canActivate(redirectUnauthorizedToLogin())
  },
  { path: 'productos', component: ProductosComponent, ...canActivate(redirectUnauthorizedToLogin()) },
  {
    path: 'producto/editar/:id',
    component: EditarProductoComponent,
    ...canActivate(redirectUnauthorizedToLogin())
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
