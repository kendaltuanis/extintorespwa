export class PersonalData {
    _id?: String;
    name: String;
    flastname: String;
    slastname: String;
    identification: String;
    company: String;
    taxname: String;
    phones: Phone;
}

export class Phone {
    countrycode?: Number;
    phone?: Number;
    extension?: Number;
}


