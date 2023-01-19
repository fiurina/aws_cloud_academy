import { MatSnackBar } from '@angular/material/snack-bar';
import { InvoiceService } from './service/invoice.service';
import {ApiService} from '../../shared/service/api/api.service'
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { catchError, lastValueFrom, map, tap, throwError } from 'rxjs';
import { Invoice } from 'src/app/shared/models/invoice.model';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
// import { ColumnMode } from 'projects/swimlane/ngx-datatable/src/public-api';
import { Router } from '@angular/router';
import { AppRoutes } from '../../shared/config/constants/router.constants';
import { HttpParams } from '@angular/common/http';
import { RequestEndpoints } from 'src/app/shared/config/constants/api.constants';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  rows: Array<Invoice>;
  expanded = {};
  timeout: any;
  editing = {};
  loadingContent: boolean;
  ColumnMode = ColumnMode;
  editionMode: boolean;
  filterModo: boolean;
  validated: boolean;
 


  private path: string = "../../assets/iconos";
  constructor(
    private invoiceService: InvoiceService,
    private snackBar: MatSnackBar,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private router: Router,
    private api: ApiService,
  ) {
    iconRegistry.addSvgIcon('trash',sanitizer.bypassSecurityTrustResourceUrl(`${this.path}/icon_trash.svg`));
    iconRegistry.addSvgIcon('eye',sanitizer.bypassSecurityTrustResourceUrl(`${this.path}/icon_eye.svg`));
    iconRegistry.addSvgIcon('pdf',sanitizer.bypassSecurityTrustResourceUrl(`${this.path}/icon_pdf.svg`));
    iconRegistry.addSvgIcon('blackCheck',sanitizer.bypassSecurityTrustResourceUrl(`${this.path}/icon_black_check.svg`));
    iconRegistry.addSvgIcon('x',sanitizer.bypassSecurityTrustResourceUrl(`${this.path}/icon_x.svg`));
  }

  ngOnInit(): void {
    this.editionMode = false;
    this.filterModo = false;
    //this.fetch(data => { this.rows = data; });
    this.getInvoices();
    this.validated = true;
  }

  ngAfterViewInit() {
    
}

  async getInvoices() {
    try {
      this.loadingContent = true;
      this.rows = new Array<Invoice>();
      this.rows = await lastValueFrom(this.invoiceService.getAllInvoices());
      console.log('Invoices ', this.rows);
      this.loadingContent = false;
    } catch (error) {
      console.log(error);
      this.loadingContent = false;
    }
  }

  async editInvoice(item: any) {
    try {
      this.loadingContent = true;
      this.rows = await lastValueFrom(this.invoiceService.editInvoice(item));
      this.loadingContent = false;
      this.snackBar.open("Invoice edited successfully", 'Accept', { duration: 5000, });
      this.getInvoices();
    } catch (error) {
      console.log(error);
      this.loadingContent = false;
    }
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', 'assets/data/dataTable.json');
    req.onload = () => {
      const rows = JSON.parse(req.response);
      for (const row of rows) {
        row.height = Math.floor(Math.random() * 80) + 50;
      }
      cb(rows);
    };
    req.send();
  }

  updateValue(event, cell, rowIndex) {
    this.editionMode = true;
    this.editing[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
    console.log('UPDATED!', this.rows[rowIndex][cell]);
    this.editInvoice(this.rows[rowIndex])
  }

  getRowHeight(row) {
    return row.height;
  }

  onCancel() {
    this.getInvoices();
    //this.fetch(data => { this.rows = data; });
    this.editionMode = false;
  }

  onSave() {
    this.editionMode = false;

  }

  onFilter() {
    this.filterModo = !this.filterModo;
  }

  //TODO Coger todo el pdf con un get y probar si con eso puedo hacer la peticion a getFile

  /*downloadPDF(event, cell, rowIndex){
    this.rows[rowIndex][cell] = event.target.value
    let httpParams = new HttpParams();
    httpParams = httpParams.append("id", rowIndex);
    return this.api.getFile(RequestEndpoints.INVOICE, httpParams).pipe(
      map(async (data: any) => {
        return data;
        console.log(data);
    }),catchError(error => throwError(error)));
  }*/

  async downloadPdf(cell,rowIndex) {
    try {
    let item = this.rows[rowIndex]
    console.log(item);
    let date = new Date();
    //let res = await this.resourcesService.exportResources(this.resourcesFilters).toPromise();
    let rows = await lastValueFrom(this.invoiceService.getPdf(item.name));
    var url = window.URL.createObjectURL(rows);
    var a = document.createElement("a");
    a.href = url;
    a.download = 'Factura '+date.getDate()+'_'+date.getMonth()+'_'+date.getFullYear()+'.pdf';
    a.click();
    window.URL.revokeObjectURL(url);
    } catch (error) { console.log(error) }
    }

  onDetail(){
    this.router.navigate([AppRoutes.details])
  }

  onDelete(){
    this.onDelete();
  }

 
  
}
