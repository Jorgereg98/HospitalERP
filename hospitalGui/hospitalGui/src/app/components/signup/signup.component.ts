import {Component} from '@angular/core'
import { IEmployee } from 'src/models/employee';
import { IClient } from 'src/models/client';
import { IAdmin } from 'src/models/admin';
import { ClientService } from 'src/services/client.service';

@Component({
    selector: 'signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent{
    public userType: string;

    public employee: IEmployee = {};
    public client: IClient = {};
    public admin: IAdmin = {};

    constructor(private clientServive: ClientService){
    }

    signupAdmin() {
        
    }

    signupClient() {
        console.log(this.client);
    }

    signupEmployee() {
        console.log(this.employee);
    }

}