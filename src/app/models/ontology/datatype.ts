import { Expose } from "class-transformer";

export class DataType {
    id:number;
    name:string;
    description:string;
    _destroy: boolean = false
}