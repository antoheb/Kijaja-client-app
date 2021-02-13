export interface IAds 
{
    id: string,
    name: string,
    description: string,
    price: number,
    category: string;
    picture: string;
    status: string;
}

export class AdsFormValues implements IAds
{
    id: string = "";
    name: string = "";
    description: string = "";
    price: number = 0;
    category: string = "";
    picture: string = "";
    status: string = "";
    
    constructor(init?: IAds)
    {
        Object.assign(this, init);
    }
}