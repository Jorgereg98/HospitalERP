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
      localStorage.clear();
    }

    signinAdmin() {
        this.adminService.getAdminByEmail(this.admin.email)
        .toPromise()
        .then( (admin) => {
            if(admin.email == this.admin.email && admin.password == this.admin.password){
                this.admin = admin;
                localStorage.setItem("adminLoggedIn", "true");
                this.router.navigate(['admin/'+this.admin.id]);
            }
        })
        .catch((error) => { this.admin = {}; });
    }

    signinClient() {
        this.clientService.getClientByEmail(this.client.email)
        .toPromise()
        .then( (client) => {
            if(client.email == this.client.email && client.password == this.client.password){
                this.client = client;
                localStorage.setItem("clientLoggedIn", "true");
                this.router.navigate(['client/'+this.client.id]);
            }
        })
        .catch((error) => { this.client = {}; });
    }

    signinEmployee() {
        this.employeeService.getEmployeeByEmail(this.employee.email)
        .toPromise()
        .then( (employee) => {
            console.log("entro qui");
            if(employee.email == this.employee.email && employee.password == this.employee.password){
                this.employee = employee;
                localStorage.setItem("employeeLoggedIn", "true");
                this.router.navigate(['employee/'+this.employee.id]);
            }
        })
        .catch((error) => { this.employee = {}; });
    }

    checkAdmin() {
        if(this.admin.email && this.admin.password)
            this.signinAdmin();
            document.getElementById("form").textContent = "";
    }

    checkClient() {
        if(this.client.email && this.client.password)
            this.signinClient();
            document.getElementById("form").textContent = "";
    }

    checkEmployee() {
        if(this.employee.email && this.employee.password)
            this.signinEmployee();
            document.getElementById("form").textContent = "";
    }
}
