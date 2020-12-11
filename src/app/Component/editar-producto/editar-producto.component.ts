import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/Model/producto.model';
import { ProductoServicio } from 'src/app/Services/producto.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css'],
})
export class EditarProductoComponent implements OnInit {
  productoFront: Producto = {
    nombre: '',
    caracteristica: '',
    precio: 0,
  };

  id: string;

  constructor(
    private productosServicio: ProductoServicio,
    private flashMessages: FlashMessagesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.productosServicio.getProducto(this.id).subscribe((producto) => {
      console.log(producto);
      this.productoFront = producto;
    });
  }

  guardar({ value, valid }: { value: Producto; valid: boolean }) {
    if (!valid) {
      this.flashMessages.show('Por favor llenar el formulario correctamente', {
        cssClass: 'alert-danger',
        timeout: 6000,
      });
    } else {
      value.id = this.id;
      // Codigo que modifica el producto
      this.productosServicio.modificarProducto(value);
      this.router.navigate(['/productos']);
    }
    Swal.fire({
      icon: 'success',
      title: 'Se guardo correctamente',
      showConfirmButton: false,
      timer: 1500
    });
  }

  eliminar() {
    if (confirm('¿Seguro que desea "ELIMINAR" el Producto?')) {
      this.productosServicio.eliminarProducto(this.productoFront);
      Swal.fire({
        icon: 'success',
        title: 'Se elimino correctamente',
        showConfirmButton: false,
        timer: 2500
      });
      this.router.navigate(['/productos']);
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Error al eliminar un producto',
        showConfirmButton: false,
        timer: 2500,
      });
    }
  }
}
