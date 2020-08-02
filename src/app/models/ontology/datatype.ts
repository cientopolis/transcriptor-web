import { Expose } from "class-transformer";

export class DataType {
    id:number;
    semantic_class:string;
    internal_type:string;
    _destroy: boolean = false
}