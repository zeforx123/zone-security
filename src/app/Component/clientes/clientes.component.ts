import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ClienteServicio } from 'src/app/Services/cliente.service';
import { Cliente } from '../../Model/cliente.model';
import { FlashMessagesService } from 'angular2-flash-messages';
import { NgForm, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientesFront: Cliente[];
  clienteFront: Cliente = {
    nombre: '',
    apellido: '',
    celular: '',
    email: '',
    producto: '',
  };
  @ViewChild('clienteForm', { static: true }) clienteForm: NgForm;
  @ViewChild('botonCerrar', { static: true }) botonCerrar: ElementRef;

  isLoading = false;

  constructor(private clientesServicio: ClienteServicio,
              private flashMessages: FlashMessagesService,
              private router: Router,
              ) { }

  ngOnInit() {
    this.clientesServicio.getClientes().subscribe(
      clientesDB => {
        this.clientesFront = clientesDB;
      }
    );
  }

  agregarCliente({value, valid}: {value: Cliente, valid: boolean}) {
    if (!valid) {
        this.flashMessages.show('Por favor llenar el campo "nombre" del Formulario Correctamente', {
          cssClass: 'alert-danger', timeout: 6000
        });
     } else {
       // Se Agrega el nuevo Cliente !!!
          this.clientesServicio.agregarCliente(value);
          this.router.navigate(['/clientes']);
          this.clienteForm.resetForm();
          this.cerrarModal();


     }
    Swal.fire({
      icon: 'success',
      title: 'Venta Agregada',
      showConfirmButton: false,
      timer: 1500
    });
  }

  cerrarModal() {
    this.botonCerrar.nativeElement.click();
  }
}
