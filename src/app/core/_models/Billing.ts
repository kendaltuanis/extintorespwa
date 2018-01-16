export class InCharge {
    name: String;
    flastname: String;
    slastname: String;
    position?: String;
}

export class Phone {
    countrycode?: Number;
    phone?: Number;
    extension?: Number;
}

export class Service {
    quantity?: Number;
    typeservice: String;
    service: String;
    unitprice?: Number;
    typeprice: String;
}

export class Discount {
    discount?: Number;
    percentage?: Number;
}

export class InvoicePayment {
    type: String;
    amount?: Number;
    voucher?: Number;
    date: Date;
}

export class Address {
    latitude: String;
    longitude: String;
    cp: String;
    suburb: String;
    details: String;
}

export class Invoice {
    incharge: InCharge; // Persona a cargo
    address: Address;
    phones: Phone;
    services: Service;
    discount: Discount;
    invoicepayment: InvoicePayment[];
    invoiceDate: Date;
    date: Date;
    type: String;
    total?: Number;
    invoicenumber?: Number;
    credittime?: Number;
    isfinished: Boolean;
}


export class Client {
    taxname: String;
    identification: String;
    company: String;
    invoices: Invoice;
    user?: String;
}



