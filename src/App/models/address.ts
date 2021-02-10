export interface IAddress {
    province: string;
    street: string;
    city: string;
    country: string;
    postalCode: string;
  }
  
  export class AddressFormValues implements IAddress {
    province: string = "";
    street: string = "";
    city: string = "";
    postalCode: string = "";
    country: string = "";
  
    constructor(init?: IAddress) {
      Object.assign(this, init);
    }
  }