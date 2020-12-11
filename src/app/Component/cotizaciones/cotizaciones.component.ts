import { Component, OnInit } from '@angular/core';
import { CotizacionServicio } from 'src/app/Services/cotizacion.service';
import { Cotizacion } from '../../Model/cotizacion.model';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-cotizaciones',
  templateUrl: './cotizaciones.component.html',
  styleUrls: ['./cotizaciones.component.css']
})
export class CotizacionesComponent implements OnInit {

  cotizacionesFront: Cotizacion[];
  cotizacionFront: Cotizacion = {
    fullname: '',
    cellphone: '',
    email: '',
    message: '',
  };

  fileName = 'ExcelSheet.xlsx';

  constructor(private clientesServicio: CotizacionServicio) { }

  ngOnInit() {
    this.clientesServicio.getQuotation().subscribe((cotizacionesDB) => {
       this.cotizacionesFront = cotizacionesDB;
      }
    );
  }
  exportexcel(): void {
    /* pass here the table id */
    const element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);

  }

}
