import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/Model/cliente.model';
import { ClienteServicio } from 'src/app/Services/cliente.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css'],
})
export class EditarClienteComponent implements OnInit {
  clienteFront: Cliente = {
    nombre: '',
    apellido: '',
    celular: '',
    email: '',
    producto: '',
  };

  id: string;

  constructor(
    private clientesServicio: ClienteServicio,
    private flashMessages: FlashMessagesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.clientesServicio.getCliente(this.id).subscribe((cliente) => {
      console.log(cliente);
      this.clienteFront = cliente;
    });
  }

  guardar({ value, valid }: { value: Cliente; valid: boolean }) {
    if (!valid) {
      this.flashMessages.show('Por favor llenar el formulario correctamente', {
        cssClass: 'alert-danger',
        timeout: 6000,
      });
    } else {
      value.id = this.id;
      // Codigo que modifica el cliente
      this.clientesServicio.modificarCliente(value);
      this.router.navigate(['/clientes']);
    }
    Swal.fire({
      icon: 'success',
      title: 'Se guardo correctamente',
      showConfirmButton: false,
      timer: 1500,
    });
  }

  eliminar() {
    if (confirm('¿Seguro que desea "ELIMINAR" el Cliente?')) {
      this.clientesServicio.eliminarCliente(this.clienteFront);
      Swal.fire({
        icon: 'success',
        title: 'Se elimino correctamente',
        showConfirmButton: false,
        timer: 2500,
      });
      this.router.navigate(['/clientes']);
    }
  }
}
