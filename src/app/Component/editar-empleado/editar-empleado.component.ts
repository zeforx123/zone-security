import { Component, OnInit } from '@angular/core';
import { Empleado } from 'src/app/Model/empleado.model';
import { EmpleadoServicio } from 'src/app/Services/empleado.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-empleado',
  templateUrl: './editar-empleado.component.html',
  styleUrls: ['./editar-empleado.component.css']
})
export class EditarEmpleadoComponent implements OnInit {
  empleadoFront: Empleado = {
    nombre: '',
    apellido: '',
    dni: '',
    celular: '',
    email: '',
    direccion: '',
  };

  id: string;

  constructor(
    private empleadosServicio: EmpleadoServicio,
    private flashMessages: FlashMessagesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}


  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.empleadosServicio.getEmpleado(this.id).subscribe((empleado) => {
      console.log(empleado);
      this.empleadoFront = empleado;
    });
  }

  guardar({ value, valid }: { value: Empleado; valid: boolean }) {
    if (!valid) {
      this.flashMessages.show('Por favor llenar el formulario correctamente', {
        cssClass: 'alert-danger',
        timeout: 6000,
      });
    } else {
      value.id = this.id;
      // Codigo que modifica el empleado
      this.empleadosServicio.modificarEmpleado(value);
      this.router.navigate(['/empleados']);
    }
    Swal.fire({
      icon: 'success',
      title: 'Se guardo correctamente',
      showConfirmButton: false,
      timer: 1500
    });
  }
  eliminar() {
    if (confirm('¿Seguro que desea "ELIMINAR" el Empleado?')) {
      this.empleadosServicio.eliminarEmpleado(this.empleadoFront);
      Swal.fire({
        icon: 'success',
        title: 'Se elimino correctamente',
        showConfirmButton: false,
        timer: 2500
      });
      this.router.navigate(['/empleados']);
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Error al eliminar un empleado',
        showConfirmButton: false,
        timer: 2500,
      });
    }
 
  }
}
