import {Component} from '@angular/core'
import { IEmployee } from 'src/models/employee';
import { IClient } from 'src/models/client';
import { IAdmin } from 'src/models/admin';
import { ClientService } from 'src/services/client.service';
import { AdminService } from 'src/services/admin.service';
import { EmployeeService } from 'src/services/employee.service';
import { Router } from '@angular/router';

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

    constructor(private employeeService: EmployeeService, private clientService: ClientService, private adminService: AdminService, private router: Router){
        this.employee.status = 1;
        this.client.status = 1;
        this.admin.status = 1;
    }

    signupAdmin() {
        this.adminService.createAdmin(this.admin)
        .toPromise()
        .then( () => {
            this.redirectLogin()
        });
    }

    signupClient() {
        this.clientService.createClient(this.client)
        .toPromise()
        .then( () => {
            this.redirectLogin()
        });
    }

    signupEmployee() {
        this.employeeService.createEmployee(this.employee)
        .toPromise()
        .then( () => {
            this.redirectLogin()
        });
    }

    redirectLogin() {
        this.router.navigate(['signin']);
    }

    checkAdmin() {
        if(this.admin.fname && this.admin.lname && this.admin.email && this.admin.password)
            this.signupAdmin();
    }

    checkClient() {
        if(this.client.fname && this.client.lname && this.client.email && this.client.password && this.client.phone)
            this.signupClient();
    }

    checkEmployee() {
        if(this.employee.fname && this.employee.lname && this.employee.email && this.employee.password && this.employee.phone && this.employee.area)
            this.signupEmployee();
    }

}