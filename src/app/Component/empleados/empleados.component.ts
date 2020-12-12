import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EmpleadoServicio } from 'src/app/Services/empleado.service';
import { Empleado } from '../../Model/empleado.model';
import { FlashMessagesService } from 'angular2-flash-messages';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {

  empleadosFront: Empleado[];
  empleadoFront: Empleado = {
    nombre: '',
    apellido: '',
    dni: '',
    celular: '',
    email: '',
    direccion: '',
  };

  @ViewChild('empleadoForm', { static: true }) empleadoForm: NgForm;
  @ViewChild('botonCerrar', { static: true }) botonCerrar: ElementRef;

  constructor(private empleadosServicio: EmpleadoServicio,
              private flashMessages: FlashMessagesService) { }

    isLoading = false;

    ngOnInit() {
      this.loadEmployee();
    }

    agregarEmpleado({value, valid}: {value: Empleado, valid: boolean}) {
      if (!valid) {
        this.flashMessages.show('Por favor llenar el campo "nombre" del Formulario Correctamente', {
          cssClass: 'alert-danger', timeout: 6000
        });
     } else {
       // Se Agrega el nuevo Empleado !!!
          this.empleadosServicio.agregarEmpleado(value);
          this.empleadoForm.resetForm();
          this.cerrarModal();
     }
      Swal.fire({
      icon: 'success',
      title: 'Empleado Agregado',
      showConfirmButton: false,
      timer: 1500
    });
  }

  loadEmployee() {
    this.isLoading = true;
    this.empleadosServicio.getEmpleados().subscribe((empleadosDB) => {
      this.empleadosFront = empleadosDB;
      this.isLoading = false;
    });
  }
  cerrarModal() {
    this.botonCerrar.nativeElement.click();
  }

}
