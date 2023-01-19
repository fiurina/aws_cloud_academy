export class Invoice {
    id: Number;
    cif: String;
    date: Date;
    name: string;
    nif: String
    subtotal: Number;
    total: Number;
    vat: Number;

    constructor(id: Number, cif: String, date: Date, name: string, nif: String, subtotal: Number, total: Number, vat: Number,) {
        this.name = name;
        this.id = id;
        this.cif = cif;
        this.date = date;
        this.subtotal = subtotal;
        this.total = total;
        this.vat = vat;
    }
}