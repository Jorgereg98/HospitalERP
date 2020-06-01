import {Component} from '@angular/core'
import { IEmployee } from 'src/models/employee';
import { IClient } from 'src/models/client';
import { IAdmin } from 'src/models/admin';
import { EmployeeService } from 'src/services/employee.service';
import { ClientService } from 'src/services/client.service';
import { AdminService } from 'src/services/admin.service';
import { Router } from '@angular/router';

@Component({
    selector: 'signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css']
})
export class SigninComponent{
    public userType: string;

    public employee: IEmployee = {};
    public client: IClient = {};
    public admin: IAdmin = {};

    constructor(private employeeService: EmployeeService, private clientService: ClientService, private adminService: AdminService, private router: Router){
    }

    signinAdmin() {
        this.adminService.getAdminByEmail(this.admin.email)
        .toPromise()
        .then( (admin) => {
            if(admin.email == this.admin.email && admin.password == this.admin.password){
                this.admin = admin;
                this.router.navigate(['admin/'+this.admin.id]);
            }
        });
    }

    signinClient() {
        this.clientService.getClientByEmail(this.client.email)
        .toPromise()
        .then( (client) => {
            if(client.email == this.client.email && client.password == this.client.password){
                this.client = client;
                this.router.navigate(['client/'+this.client.id]);
            }
            else window.alert("Credenciales incorrectas");
        });
    }

    signinEmployee() {
        this.employeeService.getEmployeeByEmail(this.employee.email)
        .toPromise()
        .then( (employee) => {
            if(employee.email == this.employee.email && employee.password == this.employee.password){
                this.employee = employee;
                this.router.navigate(['employee/'+this.employee.id]);
            }
        });
    }


    checkAdmin() {
        if(this.admin.email && this.admin.password)
            this.signinAdmin();
    }

    checkClient() {
        if(this.client.email && this.client.password)
            this.signinClient();
    }

    checkEmployee() {
        if(this.employee.email && this.employee.password)
            this.signinEmployee();
    }
}