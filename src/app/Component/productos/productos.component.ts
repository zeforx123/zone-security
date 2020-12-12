import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProductoServicio } from 'src/app/Services/producto.service';
import { Producto } from '../../Model/producto.model';
import { FlashMessagesService } from 'angular2-flash-messages';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  productosFront: Producto[];
  productoFront: Producto = {
    nombre: '',
    caracteristica: '',
    precio: 0,
  };

  @ViewChild('productoForm', { static: true }) productoForm: NgForm;
  @ViewChild('botonCerrar', { static: true }) botonCerrar: ElementRef;


  constructor(private productosServicio: ProductoServicio,
              private flashMessages: FlashMessagesService) { }

    isLoading = false;


    ngOnInit() {
      this.loadPrizes();
    }

    getCostoTotal() {
      let saldoTotal = 0;
      if (this.productosFront) {
        this.productosFront.forEach( producto => {
          saldoTotal += producto.precio;
        });
      }
      return saldoTotal;
    }

    agregarProducto({value, valid}: {value: Producto, valid: boolean}) {
      if (!valid) {
        this.flashMessages.show('Por favor llenar el campo "nombre" del Formulario Correctamente', {
          cssClass: 'alert-danger', timeout: 6000
        });
     } else {
       // Se Agrega el nuevo Producto !!!
          this.productosServicio.agregarProducto(value);
          this.productoForm.resetForm();
          this.cerrarModal();
     }
      Swal.fire({
      icon: 'success',
      title: 'Producto Agregado',
      showConfirmButton: false,
      timer: 1500
    });
  }

  loadPrizes() {
    this.isLoading = true;
    this.productosServicio.getProductos().subscribe((productosDB) => {
      this.productosFront = productosDB;
      this.isLoading = false;
    });
  }
  cerrarModal() {
    this.botonCerrar.nativeElement.click();
  }

}
