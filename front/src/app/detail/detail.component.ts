import { Component, OnInit } from '@angular/core';
import { Invoice } from 'src/app/shared/models/invoice.model';
import { FormsModule} from '@angular/forms';


@Component({
  selector: 'details',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  rows: Array<Invoice>;

  constructor() { }

  ngOnInit(): void {

  }

  vats = [4, 10, 21];

  date = new Date("2022-01-01");
  

  model = new Invoice(1, "12345678A", this.date, "Pepe", "12345678A", 500, 550, 21,);
  submitted = false;

  onSubmit() { this.submitted = true; }


  async getInvoices() {
    try {
      this.rows = new Array<Invoice>();
      //this.rows = await lastValueFrom(this.invoiceService.getAllInvoices());
      console.log('Invoices ', this.rows);
    } catch (error) {
      console.log(error);
    }
  }


  async editInvoice(item: any) {
    try {
      //this.rows = await lastValueFrom(this.invoiceService.editInvoice(item));
     // this.snackBar.open("Invoice edited successfully", 'Accept', { duration: 5000, }); No se si es necesario
      this.getInvoices();
    } catch (error) {
      console.log(error);
    }
  }

  updateValue(value) {
    
    this.rows[value]
    this.rows = [...this.rows];
    this.editInvoice(this.rows[value]);
  }

}
