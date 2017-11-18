export class UserModel {
    $key: string;
    email: string;
    dateCreated: number;
    active: boolean = true;
    password: string;
    constructor(){
        this.dateCreated =  new Date().getTime()
    }
}

