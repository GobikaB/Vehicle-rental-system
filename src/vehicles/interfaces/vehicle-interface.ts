export interface Vehicle{
    id:number;
    brand:string;
    model:string;
    type:string;
    rentPerDay:number;
    availability:boolean;
    rentedBy?:string| undefined;

    phone?:string;
    rentedAt?:Date;
    returnedAt?:Date;
}