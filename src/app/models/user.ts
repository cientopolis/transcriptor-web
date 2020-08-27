import { Type } from "class-transformer";

export class User {
    id:number;
    display_name:string;
    login:string;
    print_name:string;
    owner:boolean=false;
    admin: boolean = false;
    email:string;
    @Type(() => Date)
    created_at: Date;
    registered_at: string;

    constructor(user = null) {
        if(user) {
            this.id=user.id;
            this.display_name = user.display_name;
            this.login=user.login;
            this.print_name = user.print_name;
            this.owner=user.owner;
            this.admin = user.admin;
            this.email=user.email;
        }
    }
}